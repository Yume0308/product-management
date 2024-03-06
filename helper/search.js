module.exports.result = (req) => {
  let result = {
    deleted: false,
  };
  if (req.query.status) {
    result.status = req.query.status;
  }

  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "gi");
    result.title = regex;
  }
  return result;
};

module.exports.keyword = req=>{
  if(req.query.keyword) {
    return req.query.keyword;
  } else {
    return ""
  }
}