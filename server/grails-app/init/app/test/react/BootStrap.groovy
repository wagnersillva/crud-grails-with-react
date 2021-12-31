package app.test.react

import core.Rule
import core.User
import core.UserRule
import grails.gorm.transactions.Transactional

class BootStrap {

    def listUrl = [
            [ url: '/api/user', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/save', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/update/**', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/save/', configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/query', configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products/',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/products/**',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories/',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/categories/**',    configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/oauth/access_token',    configAttribute: 'permitAll' ],
            [ url: '/j_spring_security_switch_user',  configAttribute: 'ROLE_SWITCH_USER,isFullyAuthenticated()' ],
    ]

    def init = {
        addTestUser()
    }

    @Transactional
    void addTestUser() {
        Rule admin = Rule.findByAuthority('ROLE_ADMIN')
        if ( admin == null ) {
            admin = new Rule( authority: 'ROLE_ADMIN' ).save(flush: true)
        }

        Rule user = Rule.findByAuthority('ROLE_USER')
        if ( user == null ) {
            user = new Rule( authority: 'ROLE_USER' ).save(flush: true)
        }

        User administrador = User.findByUsername("wagnerAdmin")
        if (administrador == null){
            administrador = new User(username: "wagnerAdmin", password: "123456",
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush:true)
        }

        User common_user = User.findByUsername("wagnerUser")
        if (common_user == null){
            common_user = new User(username: "wagnerUser", password: "123456",
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush:true)
        }

        if (UserRule.findByUserAndRule(administrador, admin) == null)
        {
            new UserRule(user: administrador, rule: admin).save(flush:true)
        }
        if (UserRule.findByUserAndRule(common_user,  user) == null)
        {
            new UserRule(user: common_user, rule: user).save(flush:true)
        }

        for (String url in [
                '/', '/index', '/index.gsp', '/**/favicon.ico',
                '/assets/**', '/**/js/**', '/**/css/**', '/**/images/**',
                '/login', '/login.*', '/login/*',
                '/logout', '/logout.*', '/logout/*']) {
            if(Requestmap.findByUrl( url ) == null) {
                new Requestmap(url: url, configAttribute: 'permitAll').save()
            }
        }

     for (  item in listUrl  ) {
         if( Requestmap.findByUrl( item.url ) == null)  {
             new Requestmap(url: item.url, configAttribute: item.configAttribute).save()
         }
     }

    }

    def destroy = {
    }
}
