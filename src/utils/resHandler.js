import statusCode from "./statusCode"

const responseHandler = (res, next) => {
    res.success((data = {}) => {
        let responseData = null;
        if (Array.isArray(data.data)) {
            responseData = data.data.length > 0 ? data.data : [];
        } else if (data.data && Object.keys(data.data).length) {
            responseData = data.data;
        }
        return res.status(statusCode.SUCCESS).json({
            status: "SUCCESS",
            message: data.message ?? "Request successfully executed.",
            data: responseData
        })
    })
    res.createResource((data = {}) => {
        return res.status(statusCode.CREATE_RESOURCE).json({
            status: "CREATE_RESOURCE",
            message: data.message ?? "Resource created successfully.",
            data: data.data ?? null
        })
    })
    res.badRequest((data = {}) => {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            message: data.message ?? "Invalid request. Please check your input.",
            data: data.data ?? null
        })
    })
    res.forbidden((data = {}) => {
        return res.status(statusCode.FORBIDDEN).json({
            status: "FORBIDDEN",
            message: data.message ?? "You do not have permission to access this resource.",
            data: data.data ?? null
        })
    })
    res.notFound((data = {}) => {
        return res.status(statusCode.NOT_FOUND).json({
            status: "NOT_FOUND",
            message: data.message ?? "Resource not found.",
            data: data.data ?? null
        })
    })
    res.conflict((data = {}) => {
        return res.status(statusCode.CONFLICT).json({
            status: "CONFLICT",
            message: data.message ?? "Resource already exists.",
            data: data.data ?? null
        })
    })
    res.tooManyRequests((data = {}) => {
        return res.status(statusCode.TOO_MANY_REQUEST).json({
            status: "TOO_MANY_REQUEST",
            message: data.message ?? "Too many requests. Please try again later.",
            data: data.data ?? null
        })
    })
    res.internalServerError((data = {}) => {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            status: "INTERNAL_SERVER_ERROR",
            message: data.message ?? "Internal Server Error. Please try again later.",
            data: data.data ?? null
        })
    })
    res.badGateway((data = {}) => {
        return res.status(statusCode.BAD_GATEWAY).json({
            status: "BAD_GATEWAY",
            message: data.message ?? "Bad Gateway. Please try again later.",
            data: data.data ?? null
        })
    })
    next();
}

export default responseHandler