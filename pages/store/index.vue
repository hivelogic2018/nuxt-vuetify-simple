<template>
  <div>
    <v-row class="mb-4" justify="end">
      <v-btn @click="view = 'grid'" color="primary" class="mr-2">🔲 Grid View</v-btn>
      <v-btn @click="view = 'list'" color="primary">📃 List View</v-btn>
    </v-row>

    <v-row
      :class="view === 'list' ? 'flex-column' : ''"
      dense
      class="products"
    >
      <v-col
        v-for="(product, index) in products"
        :key="index"
        :cols="view === 'grid' ? 3 : 12"
      >
        <v-card class="pa-3" elevation="2" :class="{ 'd-flex': view === 'list' }">
          <v-img
            :src="product.img"
            height="150"
            width="auto"
            class="mr-4"
            contain
            style="max-width: 200px"
          />
          <div>
            <h3 class="text-h6 mb-1">{{ product.name }}</h3>
            <p class="text-body-2">Brand: {{ product.brand }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const view = ref('grid')

const products = [
  {
    name: 'Dell Latitude 7320',
    brand: 'Dell',
    img: 'https://i.dell.com/sites/imagecontent/products/PublishingImages/latitude-13-7320-laptop/spi/ng/notebook-latitude-13-7320-nt-hero-504x350.png'
  },
  {
    name: 'Dell Latitude 7330',
    brand: 'Dell',
    img: '/assets/products/latitude-7330-i7-1265u.jpg'
  },
  {
    name: 'Dell Precision 7920',
    brand: 'Dell',
    img: 'https://i.dell.com/sites/csimages/Video_Imagery/all/dell-precision-7920-tower.png'
  },
  {
    name: 'Dell Precision 7930',
    brand: 'Dell',
    img: 'https://i.dell.com/sites/csimages/Master_Imagery/all/precision-7865-tower-504x350.png'
  },
  {
    name: 'Lenovo ThinkPad T490',
    brand: 'Lenovo',
    img: 'https://www.lenovo.com/medias/lenovo-thinkpad-t490-subseries-hero.png?context=bWFzdGVyfHJvb3R8MzU1MzY2fGltYWdlL3BuZ3xoMzEvaDAwLzEwNzYzNzMwNzYzMjc4LnBuZ3w1M2QxYTRlMTNmZTE5MTI3NTFjZDg3ZDQzNjQ5NzMxMTEzZDExNzEyMmRjZjhjZTU4MTFkMmI4NmM0ZjI0NzNk'
  },
  {
    name: 'Lenovo ThinkPad X270 12.5" i7-7500U 2.7GHz 16GB 512GB SSD',
    brand: 'Lenovo',
    img: '/assets/products/lenovo-thinkpad-x270-gen7-i7-7500u.jpg'
  }
]
</script>

<style scoped>
.products {
  gap: 16px;
}
</style>
