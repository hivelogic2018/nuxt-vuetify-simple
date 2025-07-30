<script setup>
import { ref, computed } from 'vue'

const tab = ref('all')

const products = ref([
	{
		id: 1,
		name: 'Dell Latitude 7320',
		price: 1200,
		rating: 4.3,
		img: '/assets/latitude-7320-i7-1185g7.jpg',
		isFavorite: false,
	},
	{
		id: 2,
		name: 'Dell Latitude 7330',
		price: 1300,
		rating: 4.5,
		img: '/assets/latitude-7330-i7-1265u.jpg',
		isFavorite: false,
	},
	{
		id: 3,
		name: 'Dell Precision 7920',
		price: 2500,
		rating: 4.7,
		img: '/assets/dell-precission-7920-i9-10980xe.jpg',
		isFavorite: false,
	},
	{
		id: 4,
		name: 'Dell Latitude 3540',
		price: 700,
		rating: 4.5,
		img: '/assets/latitude-3540.jpg',
		isFavorite: false,
	},
	{
		id: 5,
		name: 'Lenovo ThinkPad 270 Gen7',
		price: 1000,
		rating: 4.0,
		img: '/assets/lenovo-thinkpad-270-gen7.jpg',
		isFavorite: false,
	},
	{
		id: 6,
		name: 'Lenovo ThinkPad E16 Gen1',
		price: 900,
		rating: 4.3,
		img: '/assets/lenovo-thinkpad-E16-gen1.jpg',
		isFavorite: false,
	},
	{
		id: 7,
		name: 'Lenovo ThinkPad T490',
		price: 1100,
		rating: 4.4,
		img: '/assets/lenovo-thinkpad-t490-i7-8565u.jpg',
		isFavorite: false,
	},
])

const toggleFavorite = (id) => {
	const index = products.value.findIndex((p) => p.id === id)
	if (index !== -1) {
		products.value[index].isFavorite = !products.value[index].isFavorite
	}
}

const cart = ref({})

const addToCart = (id) => {
	if (cart.value[id]) {
		cart.value[id] += 1
	} else {
		cart.value[id] = 1
	}
}

const filteredProducts = computed(() => {
	return tab.value === 'favorites' ? products.value.filter((p) => p.isFavorite) : products.value
})

const cartCount = computed(() => {
	return Object.values(cart.value).reduce((sum, qty) => sum + qty, 0)
})

const cartTotal = computed(() => {
	return Object.entries(cart.value).reduce((total, [id, qty]) => {
		const product = products.value.find((p) => p.id === Number(id))
		return total + (product ? product.price * qty : 0)
	}, 0)
})

const formatPrice = (price) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(price * 23000)
}
</script>

<template>
	<v-container>
		<div class="mb-4">
			<v-chip color="primary" class="mr-3" label>
				🛒 {{ cartCount }} {{ $t('nav.eCommerce.productsInCart') }}
			</v-chip>
			<v-chip color="green" label>
				{{ $t('nav.eCommerce.total') }}: {{ formatPrice(cartTotal) }}
			</v-chip>
		</div>
		<v-tabs v-model="tab" background-color="primary" dark>
			<v-tab value="all">{{ $t('nav.eCommerce.allProducts') }}</v-tab>
			<v-tab value="favorites">{{ $t('nav.eCommerce.favorites') }}</v-tab>
		</v-tabs>
		<v-row class="mt-4" dense>
			<v-col
				v-for="product in filteredProducts"
				:key="product.id"
				:cols="12"
				:sm="6"
				:md="4"
				:lg="3"
			>
				<v-card
					max-width="600"
					max-height="500"
					class="overflow-hidden my-2"
					hover
					variant="elevated"
				>
					<div class="image-wrapper">
						<v-img :src="product.img" height="150" class="rounded image-fit" contain />
						<div class="top-right-icons">
							<v-icon
								class="favorite-icon-plain"
								:color="product.isFavorite ? 'red' : 'grey'"
								:icon="product.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
								@click.stop="toggleFavorite(product.id)"
							>
								{{ product.isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
							</v-icon>

							<div class="rating-box">
								<v-icon small color="yellow darken-2">mdi-star</v-icon>
								<span class="rating-text">{{ product.rating.toFixed(1) }}</span>
							</div>
						</div>
					</div>

					<p class="mt-2" style="word-break: break-word; font-size: 0.75rem; color: gray" />
					<div class="mt-3 text-center">
						<h3 class="text-h6">{{ product.name }}</h3>
						<p class="text-subtitle-1 font-weight-medium">{{ formatPrice(product.price) }}</p>
						<div class="mt-3">
							<v-btn color="primary" @click="addToCart(product.id)">
								{{ $t('nav.eCommerce.addToCart') }}
							</v-btn>
						</div>
					</div>
				</v-card>
			</v-col>
			<v-col v-if="filteredProducts.length === 0" cols="12" class="text-center">
				<p>{{ $t('nav.eCommerce.noneProductsToShow ') }}</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
.image-wrapper {
	width: 100%;
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	background-color: #f9f9f9;
	border-radius: 8px;
}

.image-fit {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
}

.v-card {
	cursor: pointer;
	transition: box-shadow 0.3s ease;
}

.v-card:hover {
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
	position: relative;
	width: 100%;
	height: 150px;
	overflow: hidden;
	border-radius: 8px;
}

.top-right-icons {
	position: absolute;
	top: 8px;
	right: 8px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8px;
	z-index: 2;
}

.favorite-icon {
	background-color: white;
	border-radius: 50%;
	padding: 6px;
	font-size: 20px;
	cursor: pointer;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.rating-box {
	background-color: white;
	border-radius: 12px;
	padding: 2px 6px;
	display: flex;
	align-items: center;
	font-size: 14px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.rating-text {
	margin-left: 4px;
	font-weight: 500;
	color: #444;
}
</style>
