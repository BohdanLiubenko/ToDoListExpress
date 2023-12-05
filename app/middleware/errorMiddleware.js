module.exports = (err, req, res, next) => {
  console.log(`get error ${err.message}`)
  res.status(err.status || 500)
  res.render('error', { message: err.message, error: req.app.get('env') === 'development' ? err : {} })
}
