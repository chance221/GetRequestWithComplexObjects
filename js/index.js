// pull in values
//be sure getting info 
//format query response
//plug in correct variables
//parse response
//store informatino in variables
//write them to dom
const searchURL= "https://developer.nps.gov/api/v1/parks?"
const apiKey = "HHPXuveSDTKqaPA5jQ2Gv5hLMQFIqDUA5kOxsZZb"
let stateArray = [];
let statesSearched


function watchForm(){
    $('form').submit(event=>{
        event.preventDefault();
        const maxResult = $('#max-input').val();
        addToArray();
        console.log("submit button clicked")
        getParkDetails(maxResult, statesSearched)
        emptyArray();
        $(".search-states").empty();
    });
}

function addState(){
    $('#addState').click(()=>{
        if ($(".state-input").val()===" " || $(".state-input").val()===undefined || $(".state-input").val()==="" ){
            alert("Please enter a state or click Search to get results");
        }
        else{
        addToArray()
        }
    }) 
}

function addToArray(){
    stateArray.push($(".state-input").val().toUpperCase());
        statesSearched = stateArray.join(",");
        document.getElementById("clear-box").value= "";
        $("span").removeClass("hidden");
        $(".search-states").empty();
        $(".search-states").append(`<p> States added to search <br><br> ${statesSearched} </p>`);
        
}

function getParkDetails(maxResults, statesSearched){
    const params = {
        stateCode: statesSearched,
        limit: maxResults-1,
        api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + queryString;

    console.log(url)
    
    fetch(url)
        .then(response=>{
            if(response.ok){
                
                return response.json()
                
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => writeToDom(responseJson))
        .catch(err=>{
            alert(`Somethin' ant right: ${err.message}`);
        });
}


function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function writeToDom(jsonResponse){
    console.log(jsonResponse.data)
    $("#search-results").removeClass("hidden")
    $('#results-list').empty();
    for (let i=0; i<jsonResponse.data.length; i++){
        $('#results-list').append(
            `<li class="even-space">
                <h3>${jsonResponse.data[i].name}</h3>
                <p>${jsonResponse.data[i].description}</p>
                <p><a href="${jsonResponse.data[i].url}">Click To Visit Website</a></p>
            </li>`
        )
    }        
}

function emptyArray(){
    stateArray.length = 0;
}


addState();
watchForm();