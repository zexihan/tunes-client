import port from '../port.js'//use one single port file
class SearchService {

  API_URL = port + '/api';

  static myInstance = null;
  static getInstance() {
    if (SearchService.myInstance == null) {
      SearchService.myInstance = new SearchService();
    }
    return this.myInstance;
  }

  query = async (searchText, searchType) => {
    let res = await fetch(this.API_URL + "/search/" + searchText + "/type/" + searchType, {credentials: 'include'});
    let resList = await res.json();
    console.log(resList);
    return resList;
  }

  getSubject = (type, id, callback) => {
    console.log(this.API_URL + "/" + type + "/" + id)
    fetch(this.API_URL + "/" + type + "/" + id, {credentials: 'include'})
      .then(function(res){
        if (!res.ok) {
          throw Error(res.statusText)
        }
        return res
    }).then(function(response){
      return response.json()
    }).then(callback).catch(function(error){
      // alert("error check connection/ try refresh");
      console.log(error); alert("error, try refresh")})
  }

//app.get('/api/albumOrTrack/:id/comments'
  getComments = (type, id) =>{
      return fetch(this.API_URL + "/" + type + "/" + id + "/comments", {credentials: 'include'})
          .then(function(res){
              if (!res.ok) {
                  throw Error(res.statusText)
              }
              return res
          }).then(function(response){
          return response.json()
      }).catch(function(error){
          // alert("error check connection/ try refresh");
          console.log(error); alert("error, try refresh")
        
          })
  }

    // app.post('/api/album/:id/comment'
    addComment = (type, id, comment) =>{
        return fetch( this.API_URL + "/" + type + "/" + id + "/comment", {method: 'POST',
            body: JSON.stringify({comment: comment}),
            headers: new Headers({'Content-type': 'application/json'}),
            credentials: 'include'} )
            .then(function(res){
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                return res
            }).then(function(response){

                return response.json()
            }).catch(function(error){
                // alert("error check connection/ try refresh");
                console.log(error); alert("error, try refresh")})
    }
}

export default SearchService;
