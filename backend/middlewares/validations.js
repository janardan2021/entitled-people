import { frustationSchema, userSchema, reviewSchema } from "../JoiSchemas.js";


const validateFrustation = (req, res, next) => {
    console.log('joi validation running.....')
    const result = frustationSchema.validate(req.body);
    console.log(result)
    if (result.error) {
        console.log(result.error)
        const msg = result.error.details.map(el => el.message).join(' and ');
        res.status(400).json({error: msg}) 
    } else {
        next();
    }

}

const validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(', ');
        res.status(400).json({error: msg}) 
    } else {
        next();
    }

}

const validateUser = (req, res, next) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        const msg = result.error.details.map(el => el.message).join(', ');
        res.status(400).json({error: msg}) 
    } else {
        next();
    }

}

export {validateFrustation, validateUser, validateReview}