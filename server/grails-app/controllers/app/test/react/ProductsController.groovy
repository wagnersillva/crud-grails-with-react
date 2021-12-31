package app.test.react

import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class ProductsController {

    ProductsService productsService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def queryCriteria = {
        if(params.name) ilike("name",  "%"+params.name+"%")
        if( params.priceGt ) gt("price", Double.parseDouble(params.priceGt))
        if( params.price ) eq("price", Double.parseDouble(params.price))
        if( params.priceLt ) lt("price", Double.parseDouble(params.priceLt))
        if( params.quantityGt ) gt("quantity", Integer.parseInt(params.quantityGt))
        if( params.quantity ) eq("quantity", Integer.parseInt(params.quantity))
        if( params.quantityLt ) lt("quantity", Integer.parseInt(params.quantityLt))
        if( params.category ) {
            eq("category.id", Long.parseLong(params.category) )
        }
        if(params.sort)  {
            order(params.sort, params.order?:"asc")
        }  else {  order("name") }
    }

    def totalPages(Integer  total, Integer max) {
        def remainder = total%max
        def totalPage = remainder ?  ( total - total % max ) + max : total
        return totalPage
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def criteria = Products.createCriteria()
        def products = criteria.list(queryCriteria, max: params.max, offset: params.offset)
        def total  = products.getTotalCount()
        def model = [
                data: products,
                total: total,
                totalPages: total ?  totalPages( total, params.max ) : 0
        ]
        respond model
    }

    def show(Long id) {
        respond productsService.get(id)
    }

    @Transactional
    def save(Products products) {
        if (products == null) {
            render status: NOT_FOUND
            return
        }
        if (products.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond products.errors
            return
        }

        try {
            productsService.save(products)
        } catch (ValidationException e) {
            respond products.errors
            return
        }

        respond products, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Products products) {
        if (products == null) {
            render status: NOT_FOUND
            return
        }
        if (products.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond products.errors
            return
        }

        try {
            productsService.save(products)
        } catch (ValidationException e) {
            respond products.errors
            return
        }

        respond products, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || productsService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
