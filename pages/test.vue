<template>
  <v-data-table
    :headers="headers"
    :items="filteredDesserts"
    :items-per-page="5"
    class="elevation-0 custom_header_table"
    hide-default-footer
    mobile-breakpoint="0"
    loading-text="Xin chờ"
    no-results-text="Không có kết quả phù hợp"
    no-data-text="Không có dữ liệu"
    fixed-header
    light
    :class="{
      'header-full': typeShow === 2,
    }"
  >
    <template v-slot:header.name="{ header }">
      {{ header.text }}
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon small :color="dessertName ? 'primary' : ''">
              mdi-filter
            </v-icon>
          </v-btn>
        </template>
        <div style="background-color: white; width: 280px">
          <v-text-field
            v-model="dessertName"
            class="pa-4"
            type="text"
            label="Enter the search term"
          ></v-text-field>
          <v-btn
            @click="dessertName = ''"
            small
            text
            color="primary"
            class="ml-2 mb-2"
            >Clean</v-btn
          >
        </div>
      </v-menu>
    </template>

    <template v-slot:header.calories="{ header }">
      {{ header.text }}
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon small :color="calories ? 'primary' : ''">
              mdi-filter
            </v-icon>
          </v-btn>
        </template>
        <div style="background-color: white; width: 280px">
          <v-text-field
            v-model="calories"
            class="pa-4"
            type="number"
            label="Enter the search term"
          ></v-text-field>
          <v-btn
            @click="calories = ''"
            small
            text
            color="primary"
            class="ml-2 mb-2"
            >Clean</v-btn
          >
        </div>
      </v-menu>
    </template>

    <template v-slot:header.fat="{ header }">
      {{ header.text }}
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon small :color="fat ? 'primary' : ''"> mdi-filter </v-icon>
          </v-btn>
        </template>
        <div style="background-color: white; width: 280px">
          <v-text-field
            v-model="fat"
            class="pa-4"
            type="number"
            label="Enter the search term"
          ></v-text-field>
          <v-btn @click="fat = ''" small text color="primary" class="ml-2 mb-2"
            >Clean</v-btn
          >
        </div>
      </v-menu>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      dessertName: '',
      calories: '',
      fat: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'Calories', value: 'calories', sortable: false },
        { text: 'Fat (g)', value: 'fat', sortable: false },
        { text: 'Carbs (g)', value: 'carbs', sortable: false },
        { text: 'Protein (g)', value: 'protein', sortable: false },
        { text: 'Iron (%)', value: 'iron', sortable: false },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Eclair Dark',
          calories: 269,
          fat: 19.0,
          carbs: 29,
          protein: 7.0,
          iron: '9%',
        },
        {
          name: 'Eclair Light',
          calories: 190,
          fat: 9.0,
          carbs: 19,
          protein: 2.0,
          iron: '3%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  computed: {
    filteredDesserts() {
      let conditions = []
      if (this.dessertName) {
        conditions.push(this.filterDessertName)
      }
      if (this.calories) {
        conditions.push(this.filterCalories)
      }
      if (this.fat) {
        conditions.push(this.filterFat)
      }
      if (conditions.length > 0) {
        return this.desserts.filter((dessert) => {
          return conditions.every((condition) => {
            return condition(dessert)
          })
        })
      }
      return this.desserts
    },
  },
  methods: {
    filterDessertName(item) {
      return item.name.toLowerCase().includes(this.dessertName.toLowerCase())
    },
    filterCalories(item) {
      return item.calories.toString().includes(this.calories)
    },
    filterFat(item) {
      return item.fat.toString().includes(this.fat)
    },
  },
}
</script>
