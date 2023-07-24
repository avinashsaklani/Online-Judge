const express = require('express');
const { generateFile } = require('./generateFile');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get("/", (req, res) => {
    // res.json({ online: "compiler" });
    res.send("Online Compiler");
});

app.post("/run", (req, res) => {
    // console.log(req.body);
    // const language = req.body.language;
    // const code = req.body.code;
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code body!" });
    }
    // res.json(req.body);
    const filePath = generateFile(language, code);
    res.json({ language, code });
})
app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})