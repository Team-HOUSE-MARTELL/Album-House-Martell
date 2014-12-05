/**
 * Created by petrovaliev95 on 27-Nov-14.
 */

var ajaxRequester = (function () {
    "use strict";
    
    $.ajaxSetup({
        contentType: 'application/json'
    });

    function makePostRequest(url, data, success, error) {
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }

    function makePutRequest(url, data, success, error) {
        $.ajax({
            type: 'PUT',
            url: url,
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }

    function makeGetRequest(url, success, error) {
        $.ajax({
            type: 'GET',
            url: url,
            success: success,
            error: error
        });
    }

    function makeDeleteRequest(url, data, success, error) {
        $.ajax({
            type: 'DELETE',
            url: url,
            data: JSON.stringify(data),
            success: success,
            error: error
        });
    }


    return{
        post: makePostRequest,
        put: makePutRequest,
        get: makeGetRequest,
        delete: makeDeleteRequest
    }

}());