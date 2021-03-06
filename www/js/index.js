/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
//
// Use this call to get back an object json of your token
//
/////////////////////////////////////////////////////////////////////////////////

var tokenurl = window.location.protocol + '//' + window.location.host + '/oauth/token';
function tokenAjax() {
      return $.ajax({
          url:tokenurl,
          dataType: 'json'
      });
}

/////////////////////////////////////////////////////////////////////////////////
//
// Initialize function to the Viewer inside of Async Promise
//
/////////////////////////////////////////////////////////////////////////////////

var viewer;
var options = {};
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE3LTA5LTA3LTE2LTE3LTQ2LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLzE0MDQ3XzIwMTYtMTItMTkucnZ0';
var promise = tokenAjax();

promise.success(function (data) {
 options = {
      env: 'AutodeskProduction',
      accessToken: data.access_token
    };
  Autodesk.Viewing.Initializer(options, function onInitialized(){
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  }); 
})

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
 
function onDocumentLoadSuccess(doc) { 

 // A document contains references to 3D and 2D viewables.
  var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
  if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
  }

  // Choose any of the avialble viewables
  var initialViewable = viewables[0];
  var svfUrl = doc.getViewablePath(initialViewable);
  var modelOptions = {
      sharedPropertyDbPath: doc.getPropertyDbPath()
  };

   var viewerDiv = document.getElementById('viewerDiv');  

  
  //////////////////Viewer with Autodesk Toolbar///////////////////////
  viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
  //////////////////////////////////////////////////////////////////////
  viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
 
}

/**
* Autodesk.Viewing.Document.load() failuire callback.
*/
function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
* viewer.loadModel() success callback.
* Invoked after the model's SVF has been initially loaded.
* It may trigger before any geometry has been downloaded and displayed on-screen.
*/
function onLoadModelSuccess(model) {
  console.log('onLoadModelSuccess()!');
  console.log('Validate model loaded: ' + (viewer.model === model));
  console.log(model); 
}

/**
* viewer.loadModel() failure callback.
* Invoked when there's an error fetching the SVF file.
*/
function onLoadModelError(viewerErrorCode) {
  console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}  


///////////////////////////////////////////////////////////////////////////
//Change Element Color
//
//////////////////////////////////////////////////////////////////////////

function loadMyExtension(){
  viewer.loadExtension('Autodesk.ADN.Viewing.Extension.Color');    
   }   

      var elementIds= [301992, 301988, 301987];  
      var setcolor = function(){    
      viewer.setColorMaterial(elementIds,0xff0000);
       console.log('Set color done!');
    }  
                   
function onError(error) {
  console.log('Error: ' + error);
};
           

    
