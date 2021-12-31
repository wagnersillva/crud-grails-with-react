package app.test.react

import core.User

class Products  {
    Integer quantity
    Double price
    String name
    String description
    Categories category
    User user_creator
    String cod_product

    static belongsTo = [Categories, User]

    static constraints = {
        description nullable: true, blank: true
        name nullable: false
        price nullable: false
        cod_product nullable: false
        quantity nullable: false
    }

}
