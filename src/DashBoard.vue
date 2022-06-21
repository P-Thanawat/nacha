<template>
  <div>
    <b-container>
      <h4 class="my-4 text-center">DASH BOARD</h4>
      <p class="text-center">{{ thisWeek }}</p>
      <bar-chart :chartData="chartData" :chartOptions="chartOptions" />
    </b-container>
  </div>
</template>

<script>
  // import HelloWorld from "./components/HelloWorld.vue";
  import gql from "graphql-tag";
  import BarChart from "@/components/BarChart.vue";
  import * as dayjs from "dayjs";
  import * as humps from "humps";

  export default {
    components: {
      BarChart,
    },
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
    data() {
      return {
        chartOptions: {
          responsive: true,
        },
      };
    },
    computed: {
      orders() {
        return humps.camelizeKeys(this.order) || [];
      },
      thisWeek() {
        const sunday = dayjs().day(0).format("YYYY-MM-DD");
        const saturday = dayjs().day(7).format("YYYY-MM-DD");
        return `${sunday} - ${saturday}`;
      },
      revenue() {
        const filteredOrders = this.orders.filter((order) =>
          dayjs().isSame(order.orderAt, "week")
        );

        const revenue = [0, 0, 0, 0, 0, 0, 0];

        filteredOrders.forEach((order) => {
          const day = dayjs(order.orderAt).day();
          revenue[day] += order.price;
        });

        return revenue;
      },
      chartData() {
        return {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "#f87979",
              data: this.revenue,
            },
          ],
        };
      },
    },
  };
</script>

<style></style>
