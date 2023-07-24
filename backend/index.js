const express = require('express');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const app = express();

const cors = require('cors');
//middleware
app.use(cors()); // for cross origin resource sharing

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get("/", (req, res) => {
    // res.json({ online: "compiler" });
    res.send("Online Compiler");
});

app.post("/run", async (req, res) => {
    // console.log(req.body);
    // const language = req.body.language;
    // const code = req.body.code;
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code body!" });
    }
    // res.json(req.body);
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        console.log(output);
        res.json({ filePath, output });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
)
app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})