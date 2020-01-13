const logInputMiddleware = (resolve, root, args, context, info) => {
    console.log(
        `${new Date()}: logInputMiddleware - Input arguments:  ${JSON.stringify(args)}`
    )
    return resolve(root, args, context, info)
}

const logResultMiddleware = async (resolve, root, args, context, info) => {
    const result = await resolve(root, args, context, info)
    console.log(`${new Date()}: logResultMiddleware - Result:  ${JSON.stringify(result)}`)
    return result
}
export default [
    logInputMiddleware, 
    logResultMiddleware
]
