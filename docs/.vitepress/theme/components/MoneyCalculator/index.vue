<template>
  <el-form
    ref="formRef"
    class="w-full mt-32px"
    :model="form"
    label-position="top"
  >
    <el-row :gutter="20">
      <el-col :span="spanOne">
        <el-form-item
          label="起算日期"
          prop="startDate"
          :rules="selectRuquiredRule"
        >
          <el-date-picker
            v-model="form.startDate"
            class="w-full!"
            type="date"
            format="YYYY-MM-DD"
            placeholder="请选择"
            clearable
          />
        </el-form-item>
      </el-col>

      <el-col :span="spanOne">
        <el-form-item label="起算余额" prop="startValue" :rules="decimalRules">
          <el-input v-model="form.startValue" clearable placeholder="请输入" />
        </el-form-item>
      </el-col>

      <el-col :span="spanFull">
        <el-form-item
          label="收支条目"
          prop="inouts"
          :rules="selectRuquiredRule"
        >
          <el-table class="w-full!" :data="form.inouts" border>
            <el-table-column type="index" label="编号" width="40" />
            <el-table-column label="记录">
              <template #default="{ row }"> </template>
            </el-table-column>

            <el-table-column label="操作" width="80">
              <template #default="{ $index }">
                <el-button type="danger" @click="form.inouts.splice($index, 1)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FormInstance } from "element-plus";
import { useSpan } from "./useSpan";
import { MoneyIO, MoneyIOPer, MoneyIOType } from "./enums";
import dayjs from "dayjs";

const { spanOne, spanFull } = useSpan();

const formRef = ref<FormInstance>();

const form = ref({
  startValue: "0",
  startDate: dayjs().format("YYYY-MM-DD"),
  inouts: [
    {
      type: MoneyIOType.IN,
      per: MoneyIOPer.EVERY_DAY,
      amount: "",
    },
  ] as MoneyIO[],
});

const selectRuquiredRule = [
  { required: true, message: "请选择", trigger: "blur" },
];

const decimalRules = [
  { required: true, message: "请输入金额", trigger: "blur" },
  {
    pattern: /^([1-9]\d*|0)(\.\d{0,2})?$/,
    message: "请输入正确的金额",
    trigger: "blur",
  },
];
</script>

<style lang="scss" scoped></style>
