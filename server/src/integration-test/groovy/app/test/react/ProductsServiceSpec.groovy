package app.test.react

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class ProductsServiceSpec extends Specification {

    ProductsService productsService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Products(...).save(flush: true, failOnError: true)
        //new Products(...).save(flush: true, failOnError: true)
        //Products _products = new Products(...).save(flush: true, failOnError: true)
        //new Products(...).save(flush: true, failOnError: true)
        //new Products(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //_products.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        productsService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Products> productsList = productsService.list(max: 2, offset: 2)

        then:
        productsList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        productsService.count() == 5
    }

    void "test delete"() {
        Long productsId = setupData()

        expect:
        productsService.count() == 5

        when:
        productsService.delete(productsId)
        datastore.currentSession.flush()

        then:
        productsService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Products products = new Products()
        productsService.save(products)

        then:
        products.id != null
    }
}
