package app.test.react

import grails.converters.JSON
import grails.validation.ValidationException
import org.grails.web.json.JSONArray
import org.hibernate.criterion.Restrictions

import java.awt.List

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK


import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class CategoriesController {

    CategoriesService categoriesService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def queryCriteria = {

        if(params.name) {
            ilike("name",  "%"+params.name+"%")
        }

        if(params.sort)  {
            order(params.sort, params.order?:"asc")
        }  else {
            order("name")
        }
    }

    def totalPages(Integer  total, Integer max) {
        def remainder = total%max
        def totalPage = remainder ?  ( total - total % max ) + max : total
        return totalPage
    }

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def criteria = Categories.createCriteria()
        def categories = criteria.list(queryCriteria, max: params.max, offset: params.offset)
        def total = categories.getTotalCount()

        def model = [
                categories: categories,
                total: total,
                totalPges: total ? totalPages(total, params.max ) : 0
        ]

        respond  model
    }

    def show(Long id) {
        respond categoriesService.get(id)
    }

    @Transactional
    def save(Categories categories) {
        if (categories == null) {
            render status: NOT_FOUND
            return
        }
        if (categories.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond categories.errors
            return
        }

        try {
            categoriesService.save(categories)
        } catch (ValidationException e) {
            respond categories.errors
            return
        }

        respond categories, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Categories categories) {
        if (categories == null) {
            render status: NOT_FOUND
            return
        }
        if (categories.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond categories.errors
            return
        }

        try {
            categoriesService.save(categories)
        } catch (ValidationException e) {
            respond categories.errors
            return
        }

        respond categories, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || categoriesService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
