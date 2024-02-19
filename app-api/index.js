
const express = require('express');
const {PrismaClient} = require('@prisma/client');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const prisma = new PrismaClient();

//middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(__dirname + "/images")); // Serve static images

app.use(fileUpload());

app.post('/add-country', async (req, res) => {
    const countryData = req.body;
    if (!countryData.name || !countryData.description || !req.files || !req.files.image) {
        res.send({error: "You've left some fields blank", fields: ["name", "description", "image"]});
        return;
    }

    const imageFile = req.files.image;

    // Move the uploaded file to the images directory
    imageFile.mv(`${__dirname}/images/${imageFile.name}`, async (error) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: "An error occurred while uploading your image." });
            return;
        }

        // Create a new country entry in the database with the image path
        const country = await prisma.country.create({
            data: {
                name: countryData.name,
                description: countryData.description,
                image: '/images/' + imageFile.name
            }
        });

        res.send({success: "Country :"+ countryData.name + " added successfully"});
    });
});
app.get('/get-countries', async (req, res) => {
    const countries = await prisma.country.findMany();

    res.send(countries);
});
app.get('/get-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);
    const country = await prisma.country.findUnique({
        where: {
            id: countryId
        }
    });
    res.send(country);
});

app.delete('/delete-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);
    const deleteCountry = await prisma.country.delete({
        where: {
            id: countryId
        }
    });
    res.send({success: "You just deleted the Country named :" + deleteCountry.name +"."} );
});

app.patch('/update-country/:countryId', async (req, res) => {
    const countryId = parseInt(req.params.countryId);
    const countryData = req.body;
    const updateCountry = await prisma.country.update({
        where: {
            id: countryId
        },
        data: {                       
            name: countryData.name || undefined,
            description: countryData.description >> undefined,
            image: countryData.image|| undefined
        }
    });
    res.send({success: "You just updated the Country named :" + updateCountry.name +"."} );
});











app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

