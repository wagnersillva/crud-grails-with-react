package app.test.react

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class ItensOrdersServiceSpec extends Specification {

    ItensOrdersService itensOrdersService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new ItensOrders(...).save(flush: true, failOnError: true)
        //new ItensOrders(...).save(flush: true, failOnError: true)
        //ItensOrders itensOrders = new ItensOrders(...).save(flush: true, failOnError: true)
        //new ItensOrders(...).save(flush: true, failOnError: true)
        //new ItensOrders(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //itensOrders.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        itensOrdersService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<ItensOrders> itensOrdersList = itensOrdersService.list(max: 2, offset: 2)

        then:
        itensOrdersList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        itensOrdersService.count() == 5
    }

    void "test delete"() {
        Long itensOrdersId = setupData()

        expect:
        itensOrdersService.count() == 5

        when:
        itensOrdersService.delete(itensOrdersId)
        datastore.currentSession.flush()

        then:
        itensOrdersService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        ItensOrders itensOrders = new ItensOrders()
        itensOrdersService.save(itensOrders)

        then:
        itensOrders.id != null
    }
}
