var sp = getSpotifyApi();
var models = sp.require("$api/models");
var views = sp.require("$api/views");

$(function() {
	var drop_box = document.querySelector("#drop");
	drop_box.addEventListener("dragstart", function(e){
		e.dataTransfer.setData("text/html", this.innerHTML);
		e.dataTransfer.effectAllowed = "copy";
	}, false);

	drop_box.addEventListener("dragenter", function(e){
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
		this.classList.add("over");
	}, false);

	drop_box.addEventListener("dragover", function(e){
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
		return false;
	}, false);

	drop_box.addEventListener("dragleave", function(e){
		e.preventDefault();
		this.classList.remove("over");
	}, false);

	drop_box.addEventListener("drop", function(e){
		e.preventDefault();
		var drop = models.Playlist.fromURI(e.dataTransfer.getData("text"));
		this.classList.remove("over");
		loadPlaylist(drop.uri);
	}, false);	
})

function loadPlaylist(playlistString) {
	var playlist = models.Playlist.fromURI(playlistString);
	var list = new views.List(playlist);
	$("#playlist").html(list.node);
}