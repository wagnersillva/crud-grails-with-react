package app.test.react

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class OrdersServiceSpec extends Specification {

    OrdersService ordersService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Orders(...).save(flush: true, failOnError: true)
        //new Orders(...).save(flush: true, failOnError: true)
        //Orders orders = new Orders(...).save(flush: true, failOnError: true)
        //new Orders(...).save(flush: true, failOnError: true)
        //new Orders(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //orders.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        ordersService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Orders> ordersList = ordersService.list(max: 2, offset: 2)

        then:
        ordersList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        ordersService.count() == 5
    }

    void "test delete"() {
        Long ordersId = setupData()

        expect:
        ordersService.count() == 5

        when:
        ordersService.delete(ordersId)
        datastore.currentSession.flush()

        then:
        ordersService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Orders orders = new Orders()
        ordersService.save(orders)

        then:
        orders.id != null
    }
}
