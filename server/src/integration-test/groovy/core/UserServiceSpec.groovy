package core

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class UserServiceSpec extends Specification {

    UserService userService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new User(...).save(flush: true, failOnError: true)
        //new User(...).save(flush: true, failOnError: true)
        //User user = new User(...).save(flush: true, failOnError: true)
        //new User(...).save(flush: true, failOnError: true)
        //new User(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //user.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        userService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<User> userList = userService.list(max: 2, offset: 2)

        then:
        userList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        userService.count() == 5
    }

    void "test delete"() {
        Long userId = setupData()

        expect:
        userService.count() == 5

        when:
        userService.delete(userId)
        datastore.currentSession.flush()

        then:
        userService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        User user = new User()
        userService.save(user)

        then:
        user.id != null
    }
}
