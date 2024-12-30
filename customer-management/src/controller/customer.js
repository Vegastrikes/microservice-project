import Customer from '../models/customer.js'

export const create = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;

        if (!name) {
            return res.status(403).json({message: 'Customer must have a name'})
        }
        if (!company) {
            return res.status(403).json({message: 'Customer must have a company'})
        }
        if (!email) {
            return res.status(403).json({message: 'Customer must have an email'})
        }

        const customer = {
            createdBy: req.user.id,
            name: name,
            company: company,
            email: email
        }

        if (phone) {
            customer.phone = phone;
        }

        const newCustomer = await Customer.create(customer)

        return res.status(201).json({message: 'Customer created', customer: newCustomer})
    } catch (error) {
        // Email is the only unique field, so assume it is the error for email
        if (error.name == 'SequelizeUniqueConstraintError') {
            return res.status(403).json({message: 'There is already a customer record with this email'})
        }
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const update = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const customerId = req.params.id;

        const customerDB = await Customer.findOne({
            where: { id: customerId}
        })
        if (!customerDB) {
            return res.status(404).json({message: 'Customer not found'});
        }

        if (name) {
            customerDB.name = name;
        }
        if (email) {
            customerDB.name = email;
        }
        if (phone) {
            customerDB.name = phone;
        }

        const updatedCustomer = await customerDB.save();

        return res.status(201).json({message: 'Customer updated', customer: updatedCustomer})
    } catch (error) {
        // Email is the only unique field, so assume it is the error for email
        if (error.name == 'SequelizeUniqueConstraintError') {
            return res.status(403).json({message: 'There is already a customer record with this email'})
        }
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const customerDB = await Customer.findOne({
            where: { id: id }
        })
        if (!customerDB) {
            return res.status(404).json({message: 'Customer not found'});
        }

        await customerDB.destroy();

        return res.status(201).json({message: 'Customer deleted', customer: customerDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const customerDB = await Customer.findOne({
            where: { id: id }
        })
        if (!customerDB) {
            return res.status(404).json({message: 'Customer not found'});
        }

        return res.status(200).json({message: 'Customer found', customer: customerDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const find = async (req, res) => {
    try {
        const { options } = req.body;
    
        if (!options) {
            const customers = await Customer.findAll();
            return res.status(200).json({message: 'Customers found', customers: customers})
        }

        const params = {
            order: [],
            where: {}
        };

        // TODO. get lodash and use _.extend etc this is ridiculous.
        if (options.company) {
            params.where.company = options.company;
        }
        if (options.createdBy) {
            params.where.createdBy = options.createdBy;
        }
        if (options.limit) {
            params.limit = options.limit;
        }
        if (options.order) {
            for (const [key, value] of Object.entries(options.order)) {
                params.order.push([key, value])    
            }
        }

        const customers = await Customer.findAll(params)

        return res.status(200).json({message: 'Query successful', customers: customers})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}