import * as soap from 'soap'

const url =
  'http://www.dataaccess.com/webservicesserver/numberconversion.wso?wsdl'

interface NumberToDollarsParams {
  dNum: number
}

interface NumberToDollarsResult {
  // Defina a estrutura dos dados de resultado conforme a sua API SOAP
  // Por exemplo, você pode ter uma propriedade chamada "resultValue"
  resultValue: string
}

async function obterDadosSOAP(ubiNum: number): Promise<NumberToDollarsResult> {
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        reject(err)
        return
      }

      const params: NumberToDollarsParams = { ubiNum }

      client.NumberToWords(params, (soapErr, result: NumberToDollarsResult) => {
        if (soapErr) {
          reject(soapErr)
          return
        }

        resolve(result)
      })
    })
  })
}

async function mostrarDados() {
  try {
    const dados = await obterDadosSOAP(0)
    console.log('Dados da requisição SOAP:', dados)
  } catch (error) {
    console.error('Erro na requisição SOAP:', error)
  }
}

// Chamar a função para mostrar os dados
mostrarDados()
