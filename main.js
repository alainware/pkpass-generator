/* Dependencies */
const {PKPass} = require('passkit-generator');
const fs = require("fs");
const express = require("express");
/* Initialize App */
const app = express();
app.use(express.json());
/* Main Code */
app.post("/generate-pass", async (req, res) => {
    try {
        // Request params
        const {
            organizationName,
            description,
            logoText,
            headerField,
            serialNumber,
            primaryField,
            secondaryField,
            auxiliaryField,
            qrContent,
            foregroundColor,
            backgroundColor,
        } = req.body;
        // Output File Path
        const outputFilePath = "./passes/pass.pkpass";

        // Create Pass
        const pass = PKPass.from({
            model: "./model/custom.pass",
            certificates: {
                wwdr: fs.readFileSync('./certs/wwdr.pem'),
                signerCert: fs.readFileSync('./certs/signerCert.pem'),
                signerKey: fs.readFileSync('./certs/signerKey.pem'),
                signerKeyPassphrase: ""
            },
        }, {
            organizationName: organizationName,
            description: description,
            logoText: logoText,
            serialNumber: serialNumber,
            foregroundColor: foregroundColor,
            backgroundColor: backgroundColor,
        });

        (await pass).headerFields.push({
            key: headerField[0].key,
            label: headerField[0].label,
            value: headerField[0].value,
            textAlignment: "PKTextAlignmentRight"
        });

        (await pass).primaryFields.push({
            key: primaryField[0].key,
            label: primaryField[0].label,
            value: primaryField[0].value
        });

        (await pass).secondaryFields.push({
            key: secondaryField[0].key,
            label: secondaryField[0].label,
            value: secondaryField[0].value
        });

        (await pass).auxiliaryFields.push({
            key: auxiliaryField[0].key,
            label: auxiliaryField[0].label,
            value: auxiliaryField[0].value
        }, {
            key: auxiliaryField[1].key,
            label: auxiliaryField[1].label,
            value: auxiliaryField[1].value
        });

        (await pass).setBarcodes(qrContent);

        // Generate the .pkpass file and save it
        const passStream = (await pass).getAsStream()
        const writeStream = fs.createWriteStream(outputFilePath);

        passStream.pipe(writeStream);

        writeStream.on("finish", () => {
            console.log(`Pass saved at ${outputFilePath}`);
            res.status(200).send(`Pass successfully saved at ${outputFilePath}`);
        });

        writeStream.on("error", (err) => {
            console.error("Error saving pass:", err);
            res.status(500).send("Error saving pass");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating pass");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));

