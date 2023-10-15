const defaultPageLimit = 0;
const defaultPageNumber = 1;
function getPagination(query){
const limit = Math.abs(query.limit) || defaultPageLimit;
const page = Math.abs(query.page) || defaultPageNumber;
const skip = (page -1) * limit;
return{
skip,
limit
}
}
module.exports ={getPagination};