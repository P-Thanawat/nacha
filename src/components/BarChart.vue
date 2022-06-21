<template>
  <div>
    <b-card>
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </b-card>
  </div>
</template>

<script>
  import { Bar } from "vue-chartjs/legacy";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  export default {
    components: {
      Bar,
    },
    props: {
      chartId: {
        type: String,
        default: "bar-chart",
      },
      datasetIdKey: {
        type: String,
        default: "label",
      },
      width: {
        type: Number,
        default: 200,
      },
      height: {
        type: Number,
        default: 200,
      },
      cssClasses: {
        type: String,
        default: "",
      },
      styles: {
        type: Object,
        default: () => {},
      },
      plugins: {
        type: Object,
        default: () => {},
      },
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>

<style lang="scss" scoped></style>
