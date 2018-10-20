module.exports.errorHandler = function(error, request, response, next){
  return response.status(error.status || 500).json({
      result: {
          status: {
              code: error.status,
              message: error.message || 'Oops! Something went wrong'
          }
      }
  })
}