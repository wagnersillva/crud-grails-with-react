package core

import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.BAD_REQUEST

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class UserController {

    UserService userService

    static responseFormats = ['json']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def totalPages(Integer  total, Integer max) {
        def remainder = total%max
        def totalPage = remainder ?  ( total - total % max ) + max : total
        return totalPage
    }

    def index(Integer max) {

        params.max = Math.min(max ?: 10, 100)

        def users = userService.list(params)

        def total = userService.count().intValue()

        def model  = [
            data: users,
            total:  total,
            totalPages: total ? totalPages( total, params.max ) : 0,
            max:  params.max,
            offset: params.offset ? Integer.parseInt(params.offset) : 0
        ]

        respond model
        
    }

    def query() {

        def username = params.username

        def user = User.findByUsername(username)

        respond data: user

    }

    def show(Long id) {
        respond userService.get(id)
    }

    @Transactional
    def save(  ) {
        Rule rule = Rule.findByAuthority( request.JSON?.role?.authority )
        User user =  User.findByUsername( request.JSON?.user?.username )
        if( rule == null) {
            respond status: BAD_REQUEST, message: "Rule not exists"
            return
        }
        if( user == null ) {
            try {
                user = new User(username: request.JSON?.user?.username, password: request.JSON?.user?.password?: 968574123, enabled: request.JSON?.user?.enabled?: false)
                userService.save(user)
                if (user.hasErrors()) {
                    transactionStatus.setRollbackOnly()
                    respond user.errors
                    return
                }

                if (UserRule.findByUserAndRule(user, rule) == null){
                    new UserRule(user: user, rule: rule).save(flush:true)
                } else {
                    respond status: BAD_REQUEST, message: "User with this Rule has exists"
                    return
                }

            } catch (ValidationException e) {
                respond user.errors
                return
            }
        } else {
            respond status: BAD_REQUEST, message: "User has exists"
            return
        }

        respond Rule: rule, User: user
    }

    @Transactional
    def update() {
        def bodyRequest = request.JSON
        def bodyUser = bodyRequest?.user
        def bodyRole = bodyRequest?.role ?  bodyRequest?.role?.authority : null
        Rule rule = bodyRole ?  Rule.findByAuthority( bodyRole ) : null
        User user =  User.findById( params.id )
        UserRule userRule =  UserRule.findByUser(user)

        if( bodyRole && rule == null) {
            respond status: BAD_REQUEST, message: "Rule not exists"
            return
        }
        if (user == null) {
            render  status: NOT_FOUND
            return
        }
        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors
            return
        }

        user.username = bodyUser.username ?: user.username
        user.password = bodyUser.password ?: user.password
        user.passwordExpired = bodyUser.passwordExpired  != null ? bodyUser.passwordExpired : user.passwordExpired
        user.accountLocked = bodyUser.accountLocked  != null ? bodyUser.accountLocked: user.accountLocked
        user.accountExpired = bodyUser.accountExpired  != null ? bodyUser.accountExpired : user.accountExpired
        user.enabled = bodyUser.enabled != null ? bodyUser.enabled  :  user.enabled

        try {
            user.save(flush:true)
            if( bodyRole && userRule == null ) {
                new UserRule(user: user, rule: rule).save(flush:true)
            } else if(bodyRole) {
                userRule.save(user: user, rule: rule)
            }
        } catch (ValidationException e) {
            respond user.errors
            return
        }

        respond data: user
    }

    @Transactional
    def delete(Long id) {
        if (id == null || userService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
