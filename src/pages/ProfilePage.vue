<script setup>
import { ref, onMounted } from "vue";
import { getUserInfoService } from "../api/user";

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
});
const user = ref({});

onMounted(async () => {
  user.value = await getUserInfoService(props.uid);
});
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <section class="py-6 w-full flex justify-center items-start gap-10">
      <div class="w-24 h-24 flex flex-col gap-1">
        <img
          class="w-full h-full rounded-full object-cover"
          :src="user.avatar"
          :alt="user.username"
        />
        <router-link to="/profile/edit">
          <y-button type="primary" class="w-full">编辑个人资料</y-button>
        </router-link>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl text-zinc-700 font-bold tracking-wider">
          {{ user.username }}
        </h1>
        <p class="flex gap-1 items-center">
          <y-svg-icon class="w-4 h-4" name="IconIdentify"></y-svg-icon>
          <span class="text-zinc-400 text-sm">{{ user._id }}</span>
        </p>
        <p class="flex gap-2">
          <span
            class="flex gap-1 items-center border shadow rounded px-1 py-0.5"
          >
            <y-svg-icon
              class="w-4 h-4"
              :name="user.gender === 'male' ? 'IconMale' : 'IconFemale'"
            ></y-svg-icon>
            <span class="text-sm"> 25岁 </span>
          </span>
          <span class="text-sm border shadow px-1 rounded py-0.5">{{
            user.location
          }}</span>
        </p>
        <p class="text-gray-700 text-lg">{{ user.headline }}</p>
        <p class="text-gray-500 text-sm cursor-pointer">
          {{ user.social_link }}
        </p>
        <div></div>
      </div>
    </section>
    <section class="px-2 sm:px-6">
      <input type="radio" name="tab" id="works" class="hidden" checked />
      <input type="radio" name="tab" id="likes" class="hidden" />
      <input type="radio" name="tab" id="histories" class="hidden" />
      <div class="my-4 nav">
        <label for="works">
          <span class="cursor-pointer py-1 px-2 rounded-md inline-block"
            >作品</span
          >
        </label>
        <label for="likes">
          <span class="cursor-pointer py-1 px-2 rounded-md inline-block"
            >喜欢</span
          >
        </label>
        <label for="histories">
          <span class="cursor-pointer py-1 px-2 rounded-md inline-block"
            >观看历史</span
          >
        </label>
      </div>

      <div class="hidden tab-works p-2 border rounded-lg shadow-md">
        <img src="https://img.zcool.cn/community/017m90bzsjyd1kvmxow68s3130.jpg?x-oss-process=image/format,webp" alt="">
        <img src="https://img.zcool.cn/community/01qgflc5tavfwzfovowyjp3739.jpg?x-oss-process=image/format,webp" alt="">
      </div>
      <div class="hidden tab-likes p-2 rounded-xl shadow-md">
        <img src="https://img.zcool.cn/community/017m90bzsjyd1kvmxow68s3130.jpg?x-oss-process=image/format,webp" alt="">
        <img src="https://img.zcool.cn/community/01qgflc5tavfwzfovowyjp3739.jpg?x-oss-process=image/format,webp" alt="">
      </div>
      <div class="hidden tab-histories p-2 rounded-xl shadow-md">
        <img src="https://img.zcool.cn/community/017m90bzsjyd1kvmxow68s3130.jpg?x-oss-process=image/format,webp" alt="">
        <img src="https://img.zcool.cn/community/01qgflc5tavfwzfovowyjp3739.jpg?x-oss-process=image/format,webp" alt="">
      </div>
    </section>
  </div>
</template>
<style scoped>
#works:checked ~ .tab-works {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2;
}

#works:checked ~ .nav label[for="works"] span {
  @apply border font-bold duration-300 shadow-md;
}

#likes:checked ~ .tab-likes {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2;
}

#likes:checked ~ .nav label[for="likes"] span {
  @apply border font-bold duration-300 shadow-md;
}

#histories:checked ~ .tab-histories {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2;
}

#histories:checked ~ .nav label[for="histories"] span {
  @apply border font-bold duration-300 shadow-md;
}
</style>
