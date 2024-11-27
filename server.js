const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Initialize the Express app
const app = express()
const port = process.env.PORT || 3000

dotenv.config({ path: './global.env' })

// Middleware
app.use(bodyParser.json())

//Json
const json_params = {
    activityID: { value: "", type: "String", description: "Identificador de instância de actividade" },
    subject: { value: "", type: "String", description: "Assunto em questão" },
    body: { value: "", type: "String", description: "Corpo do texto" },
    advice_category: { value: "", type: "String", description: "Categoria de consulta" },
    post_date: { value: "", type: "String", description: "Data de publicação/submissão/post" }
}

const analytics = {
    activityID: { value: "", type: "String", description: "Identificador de instância de actividade" },
    adviser_identifier: { value: "", type: "String", description: "Identificador do conselheiro/consultor" },
    consultant_identifier: { value: "", type: "String", description: "Identificador do utilizador/usuário" },
    quantAnalytics: {
        post_number: { value: 0, type: "Number", description: "Contador de actividade inventiva" },
        response_date: { value: "", type: "Date", description: "Data de resposta sobre as questões colocadas pelo utilizador/usuário" },
    },
    qualAnalytics: {
        consultant_feedback: { value: "", type: "Date", description: "Feedback utilizador/usuário" },
        additional_information: { value: "", type: "String", description: "Feedback utilizador/usuário" },
    }
}

//Routes
app.get('/', (req, res) => {
    res.json({
        activity_name: "Pedido de Aconselhamento",
        config_url: process.env.HOST + "/page/configActivity",
        json_params_url: process.env.HOST + "/api/json_params_list",
        user_url: process.env.HOST + "/api/deployActivity",
        analytics_url: process.env.HOST + "/api/analytics",
        analytics_list_url: process.env.HOST + '/api/analytics_list'
    })
})

app.get('/api/json_params_list', (req, res) => {
    res.json(json_params)
})

app.get('/api/analytics_list', (req, res) => {
    res.json(analytics)
})

app.get('*', (req, res) => {
    res.json({
        message: "URL sem serviço no Activity Provider \n try URL json_params_list endpoint"
    })
})

app.listen(port, () => {
    console.log('Web service is running on ' + port)
})

