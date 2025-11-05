import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    
    try {
        const {name, price, currency, frequency, category, paymentMethod, status, startDate, renewalDate} = req.body;

        
        const subscription = await Subscription.create({
            name,
            price,
            currency,
            frequency,
            category,
            paymentMethod,
            status,
            startDate,
            renewalDate,
            user: req.user._id
        });

        res.status(201).json({success : true, data: subscription });
    } catch (error) {
        next(error)
        
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // chec if the user is the same as the one in the token
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: {} });
    } catch (e) {
        next(e);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
};

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const upcomingRenewals = await Subscription.find({
            renewalDate: {
                $gte: new Date(),
                $lte: new Date(new Date().setDate(new Date().getDate() + 7))
            },
            status: 'active'
        });

        res.status(200).json({ success: true, data: upcomingRenewals });
    } catch (e) {
        next(e);
    }
};