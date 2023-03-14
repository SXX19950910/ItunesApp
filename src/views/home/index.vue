<template>
  <div class="app-home">
    <div class="app-home__search p-3 border-b-2 border-b-[#F8F8F8] bg-white">
      <search-input @search="onSearch" />
    </div>
    <div class="app-home__recommend border-b py-3 bg-white">
      <div class="title text-black px-3">Recommend</div>
      <div class="list-area px-3 flex overflow-auto gap-4 mt-2">
        <div v-for="item in data.recommendList" :key="item.id.label" class="item shrink-0 flex items-center justify-center flex-col w-1/4">
          <div class="thumb">
            <van-image class="rounded-2xl" lazy-load radius="16" :src="item['im:image'][2].label" :alt="item.title.label" />
          </div>
          <div class="name mt-2 text-[#333] text-14">{{ item['im:name'].label }}</div>
          <div class="type mt-0.5 text-[#999] text-14">{{ item.category.attributes.label }}</div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" class="app-home__list px-2" :finished="finished" @load="onLoad">
        <div v-for="(item, index) in data.list" :key="item.id.label" class="item flex items-center py-3 border-b">
          <div class="index mx-5">{{ index + 1 }}</div>
          <div class="thumb flex items-center justify-center">
            <van-image class="rounded-2xl" lazy-load :src="item['im:image'][1].label" :alt="item.title.label" />
          </div>
          <div class="info ml-5 self-start">
            <div class="name text-[#333] text-14">{{ item['im:name'].label }}</div>
            <div class="type mt-0.5 text-[#999] text-12">{{ item.category.attributes.label }}</div>
            <van-rate v-model="item.rate" :size="12" color="#ffd21e" void-icon="star" void-color="#eee"/>
            <span class="text-12 text-[#999]">（{{ item.comment }}）</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getRecommendList, getList } from '@/apis/home'
import SearchInput from '@/components/SearchInput/index.vue'

const data = reactive({
  recommendList: [],
  list: [],
  shadowList: [],
  fullList: [],
  finished: false,
  rate: 3,
  keyword: ''
})

const finished = ref(false)
const refreshing = ref(false)
const loading = ref(false)


const init = async () => {
  await queryRecommendList()
  await queryList()
}

const onSearch = (value) => {
  data.keyword = value
  const reg = new RegExp(value)
  data.list = data.shadowList.filter(item => {
    return item['im:name'].label.match(reg) || item.summary.label.match(reg) || item['im:artist'].label.match(reg)
  })
}


const queryList = async () => {
  const res = await getList()
  data.fullList = res.feed.entry.map(item => {
    const newItem = {...item}
    newItem.comment = Math.ceil(Math.random() * 3000)
    newItem.rate = Math.ceil(Math.random() * 5)
    return newItem
  })
  data.shadowList = JSON.parse(JSON.stringify(data.fullList))
  if (!data.list.length) {
    onLoad()
  }
}

const queryRecommendList = async () => {
  const res = await getRecommendList()
  data.recommendList = res.feed.entry
}

const onRefresh = () => {
  const timer = setTimeout(() => {
    refreshing.value = false
    clearTimeout(timer)
  }, 1000)
}

const onLoad = () => {
  if (data.keyword) {
    loading.value = false
    return
  }
  if (data.list.length >= 100) {
    loading.value = false
    finished.value = true
  } else {
    loading.value = true
    const timer = setTimeout(() => {
      data.list = data.list.concat(data.fullList.splice(0, 10))
      loading.value = false
      clearTimeout(timer)
    }, 1500)
  }
}

onMounted(() => {
  init()
})

</script>

<style lang="less">
.app-home {
  &__recommend {
    .list-area {
      .item {
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
      }
    }
  }
  &__list {
    .item {
      &:nth-child(odd) {
        .van-image__img {
          border-radius: 16px;
        }
      }
      &:nth-child(even) {
        .van-image__img {
          border-radius: 100%;
        }
      }
    }
  }
}
</style>