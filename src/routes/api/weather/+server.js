import OpenAI from 'openai'
import {OpenAIStream, StreamingTextResponse} from 'ai'
import {env} from '$env/dynamic/private'

const getWeather = async (location, format) => {
  let api_key = 'ab95f6f831fc796edc23c3819e416e7b'
  let units = format === 'celsius' ? 'metric' : 'imperial'
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${location}&units=${units}`)
}

const context = [
  {
    role: 'system',
    content: '함수에 연결할 값을 가정하지 마세요.\n지명은 영어로 바꿔줘\n사용자의 요청이 모호한 경우 추가 설명을 요청하세요\n한국어로 친절하게 이모지를 섞어서 답변해줘'
  }
]
const tools = [
  {
    type: 'function',
    function: {
      name: 'getWeather',
      description: '현재 위치의 현재 날씨를 확인합니다.',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: '도시(예: 서울)'
          },
          format: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
            description: '사용할 온도 단위입니다. 사용자 위치에서 이를 유추합니다.'
          }
        },
        required: ['location', 'format']
      }
    }
  }
]

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || ''
})

export const POST = async ({request}) => {
  // const {prompt} = await request.json()
  // console.log(prompt)

  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: context.concat({role: 'user', content: prompt}),
  //   tools: tools,
  //   temperature: 0,
  //   max_tokens: 4095
  // })
  // let f = response.choices[0].message.tool_calls[0].function
  // let arg = JSON.parse(f.arguments)
  // console.log(`${f.name}('${arg.location}', '${arg.format}')`)
  // let res = await eval(`${f.name}('${arg.location}', '${arg.format}')`)
  // res = await res.json()
  // let {temp, humidity} = res.main
  // console.log(temp)
  // console.log(humidity)

  // const resres = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   stream: true,
  //   messages: [
  //     {role: 'system', content: '친절하게 이모지를 섞어서 답변해줘'},
  //     {role: 'user', content: prompt},
  //     {role: 'function', name: 'getWeather', content: `날씨: ${res.weather[0].description} 온도: ${temp}, 습도: ${humidity}`}
  //   ],
  //   tools: tools,
  //   temperature: 0,
  //   max_tokens: 4095
  // })
  // const stream = OpenAIStream(resres)
  // return new StreamingTextResponse(stream)
  return 'Hello, World!'
}
