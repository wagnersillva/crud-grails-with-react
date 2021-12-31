package core

import grails.gorm.DetachedCriteria
import groovy.transform.ToString

import org.codehaus.groovy.util.HashCodeHelper
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@ToString(cache=true, includeNames=true, includePackage=false)
class UserRule implements Serializable {

	private static final long serialVersionUID = 1

	User user
	Rule rule

	@Override
	boolean equals(other) {
		if (other instanceof UserRule) {
			other.userId == user?.id && other.ruleId == rule?.id
		}
	}

    @Override
	int hashCode() {
	    int hashCode = HashCodeHelper.initHash()
        if (user) {
            hashCode = HashCodeHelper.updateHash(hashCode, user.id)
		}
		if (rule) {
		    hashCode = HashCodeHelper.updateHash(hashCode, rule.id)
		}
		hashCode
	}

	static UserRule get(long userId, long ruleId) {
		criteriaFor(userId, ruleId).get()
	}

	static boolean exists(long userId, long ruleId) {
		criteriaFor(userId, ruleId).count()
	}

	private static DetachedCriteria criteriaFor(long userId, long ruleId) {
		UserRule.where {
			user == User.load(userId) &&
			rule == Rule.load(ruleId)
		}
	}

	static UserRule create(User user, Rule rule, boolean flush = false) {
		def instance = new UserRule(user: user, rule: rule)
		instance.save(flush: flush)
		instance
	}

	static boolean remove(User u, Rule r) {
		if (u != null && r != null) {
			UserRule.where { user == u && rule == r }.deleteAll()
		}
	}

	static int removeAll(User u) {
		u == null ? 0 : UserRule.where { user == u }.deleteAll() as int
	}

	static int removeAll(Rule r) {
		r == null ? 0 : UserRule.where { rule == r }.deleteAll() as int
	}

	static constraints = {
	    user nullable: false
		rule nullable: false, validator: { Rule r, UserRule ur ->
			if (ur.user?.id) {
				if (UserRule.exists(ur.user.id, r.id)) {
				    return ['userRole.exists']
				}
			}
		}
	}

	static mapping = {
		id composite: ['user', 'rule']
		version false
		rule lazy:false
	}
}
