export default {
  global: {
    inner: '!rounded-none !border-0',
    input: 'rounded-none',
  },
  'family:button': {
    input:
      '!bg-gold !rounded-none data-[next=true]:after:content-["»"] after:ml-1 data-[prev=true]:before:content-["«"] before:mr-1',
  },
}