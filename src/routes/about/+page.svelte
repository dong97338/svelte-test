<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
  import {useCompletion} from 'ai/svelte'
  const {completion, complete} = useCompletion({api: 'api/weather'})
  let input = '서울의 날씨를 알려줘'


</script>

<p>질문을 입력하세요!</p>
<input bind:value={input} /><button on:click={()=>complete(input)}>다음</button>
<p>{$completion}</p>

