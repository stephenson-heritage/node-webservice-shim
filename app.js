const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const debug = require("debug")("express:server");
const bodyParser = require("body-parser");
const app = express();
//const dbLayer = require("./config/db");
const fetch = require("node-fetch");
const cors = require("cors");

const port = 9000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/inc", express.static(path.join(__dirname, "inc")));

//app.use(cors());

app.get("/getToilets", cors(), async (req, res) => {
	const response = await fetch(
		"http://data.ottawa.ca/dataset/e883ac3c-5e99-468e-b9d5-c2bf0015af68/resource/45f4c2ad-327e-4eef-8d7c-1772fc3d8e56/download/publicwashrooms.json"
	);
	const data = await response.json();

	res.json(data);
});

//app.use("/api/addressBook", addressBookRouter);

app.listen(port, function() {
	//dbLayer.init();
	debug("WebAPI Forwarder " + port + "!");
});
