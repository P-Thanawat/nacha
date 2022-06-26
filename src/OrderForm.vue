<template>
  <div>
    <b-container class="bv-example-row">
      <h4 class="my-5">ORDER MANAGEMENT</h4>
      <b-row>
        <b-col lg="3"></b-col>
        <b-col lg="6">
          <b-card>
            <h6 class="my-4">CREATE ORDER</h6>
            <b-form @submit.stop.prevent="onSave">
              <b-input-group prepend="Order Date" class="mt-3"> </b-input-group>
              <div class="d-flex justify-content-start">
                <date-picker
                  class="align-left"
                  v-model="payload.orderDate"
                  placeholder="Choose date period"
                />
              </div>
              <b-input-group prepend="Order Method" class="mt-3">
              </b-input-group>
              <v-select
                v-model.trim="payload.method"
                :reduce="(item) => item.value"
                :options="methodOptions"
                :clearable="false"
                placeholder="Method"
              />

              <div
                :key="idx"
                v-for="(item, idx) in productQty"
                class="mt-4 p-2"
              >
                <b-card>
                  <b-row>
                    <!-- product -->
                    <b-col cols="6">
                      <v-select
                        v-model.trim="selectedProducts[idx]"
                        :reduce="(item) => item.value"
                        :options="productOptions"
                        :clearable="false"
                        placeholder="PRODUCT"
                      />
                    </b-col>
                    <!-- size -->
                    <b-col cols="6">
                      <v-select
                        v-model.trim="selectedSizes[idx]"
                        :reduce="(item) => item.value"
                        :options="sizeOptions"
                        :clearable="false"
                        placeholder="SIZE"
                      />
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <!-- sauce -->
                    <b-col cols="6">
                      <v-select
                        v-model.trim="selectedSauces[idx]"
                        :reduce="(item) => item.value"
                        :options="sauceOptions"
                        :clearable="false"
                        placeholder="SAUCE"
                      />
                    </b-col>
                    <!-- quantity -->
                    <b-col cols="6">
                      <v-select
                        v-model.trim="selectedQtys[idx]"
                        :reduce="(item) => item.value"
                        :options="qtyOptions"
                        :clearable="false"
                        placeholder="QUANTITY"
                      />
                    </b-col>
                  </b-row>
                </b-card>
              </div>
              <!-- icon -->
              <b-button
                :style="{
                  background: '#F0ACCF',
                  color: 'white',
                  borderColor: 'white',
                }"
                @click="addProductQty"
                :disabled="loading"
                >+</b-button
              >
              <b-row>
                <!-- price -->
                <b-col cols="12" class="mb-3">
                  <b-input-group prepend="Price" class="mt-3">
                    <b-form-input
                      type="number"
                      v-model="payload.price"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
              <div class="d-flex justify-content-end me-3 my-2">
                <b-button type="submit" variant="warning">
                  <b-spinner small class="mr-1 ui-spinner" v-if="loading" />
                  SAVE
                </b-button>
              </div>
            </b-form>
          </b-card>
        </b-col>
        <b-col lg="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  // import HelloWorld from "./components/HelloWorld.vue";
  import DatePicker from "vue2-datepicker";
  import "vue2-datepicker/index.css";
  import VSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import gql from "graphql-tag";
  import * as _ from "lodash";
  import { required } from "vuelidate/lib/validators";

  export default {
    apollo: {
      order: gql`
        query getOrderList {
          order {
            uuid
            method
            order_at
            price
            created_at
            updated_at
            order_items {
              uuid
              name
              quantity
              size
              sauce
              created_at
              updated_at
            }
          }
        }
      `,
    },
    name: "App",
    components: {
      // HelloWorld,
      DatePicker,
      VSelect,
    },
    data() {
      return {
        loading: false,
        payload: {},
        selectedProducts: [],
        selectedSizes: [],
        selectedSauces: [],
        selectedQtys: [],
        selectedPrices: [],
        qty: [],
        productQty: 1,
        methodOptions: [
          { value: "store", label: "Store" },
          { value: "delivery", label: "Delivery" },
          { value: "grab", label: "Grab Food" },
          { value: "lineman", label: "Line Man" },
        ],
        productOptions: [
          { value: "criossant", label: "Criossant" },
          { value: "croffle", label: "Croffle" },
          { value: "dip", label: "Dip" },
          { value: "cocoa", label: "Cocoa" },
        ],
        sizeOptions: [
          { value: "m", label: "M" },
          { value: "l", label: "L" },
        ],
        sauceOptions: [
          { value: "chocolate", label: "Chocolate" },
          { value: "whiteChocolate", label: "White Chocolate" },
          { value: "matcha", label: "Matcha" },
          { value: "cheese", label: "Sausage Cheese" },
          { value: "caramel", label: "Caramel" },
        ],
        qtyOptions: [
          { value: 1, label: 1 },
          { value: 2, label: 2 },
          { value: 3, label: 3 },
          { value: 4, label: 4 },
          { value: 5, label: 5 },
        ],
        validations: {
          payload: {
            name: {
              required,
            },
          },
        },
      };
    },
    computed: {
      selectedQty() {
        return new Array(this.selectedQtys.length + 1);
      },
      selected() {
        const selected = [];
        const selectedProducts = _.get(this, "selectedProducts", []);

        selectedProducts.forEach((product, idx) => {
          const quantity = _.get(this, ["selectedQtys", idx], "");
          if (!product || !quantity) return;
          selected.push({
            name: product,
            quantity: _.get(this, ["selectedQtys", idx], ""),
            sauce: _.get(this, ["selectedSauces", idx], ""),
            size: _.get(this, ["selectedSizes", idx], ""),
          });
        });

        return selected;
      },
    },
    methods: {
      addProductQty() {
        this.productQty = this.productQty + 1;
      },
      makeToast() {
        this.$bvToast.show("toast");
      },
      clearData() {
        this.payload = {};
        this.selectedProducts = [];
        this.selectedQtys = [];
        this.selectedSizes = [];
        this.selectedSauces = [];
      },
      async onSave() {
        this.loading = true;
        const method = _.get(this, ["payload", "method"], "");
        const orderAt = _.get(this, ["payload", "orderDate"], "");
        const price = _.get(this, ["payload", "price"], "");
        const data = _.get(this, "selected", []);
        const orderItems = { data };

        await this.$apollo.mutate({
          mutation: gql`
            mutation MyMutation(
              $method: String
              $order_at: timestamptz
              $order_items: order_items_arr_rel_insert_input
              $price: numeric
            ) {
              insert_order(
                objects: {
                  price: $price
                  order_at: $order_at
                  method: $method
                  order_items: $order_items
                }
              ) {
                affected_rows
              }
            }
          `,
          variables: {
            method,
            order_at: orderAt,
            price,
            order_items: orderItems,
          },
        });

        this.clearData();
        this.loading = false;
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    --vs-font-size: 14px;
    --vs-line-height: 1;
  }
</style>
