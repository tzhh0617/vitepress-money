<template>
  <el-form
    ref="formRef"
    class="w-full mt-32px vp-raw"
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
          <el-button
            class="absolute right-0 top--38px z-99"
            type="primary"
            @click="onClickAdd"
          >
            添加
          </el-button>

          <el-table class="w-full!" :data="form.inouts" border>
            <el-table-column type="index" label="编号" width="54" />
            <el-table-column label="收支">
              <template #default="{ row, $index }">
                <el-row :gutter="8">
                  <el-col :span="span6">
                    <el-form-item
                      :prop="`inouts.${$index}.type`"
                      :rules="selectRuquiredRule"
                    >
                      <el-select
                        class="w-full!"
                        v-model="row.type"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option label="收入" :value="MoneyIOType.IN" />
                        <el-option label="支出" :value="MoneyIOType.OUT" />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="span6">
                    <el-form-item
                      :prop="`inouts.${$index}.type`"
                      :rules="selectRuquiredRule"
                    >
                      <el-select
                        class="w-full!"
                        v-model="row.per"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          label="一次性"
                          :value="MoneyIOPer.PER_DATE"
                        />
                        <el-option label="每天" :value="MoneyIOPer.PER_DAY" />
                        <el-option label="每月" :value="MoneyIOPer.PER_MONTH" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="row.per === MoneyIOPer.PER_MONTH" :span="span6">
                    <el-form-item
                      :prop="`inouts.${$index}.perMonthDate`"
                      :rules="selectRuquiredRule"
                    >
                      <el-select
                        class="w-full!"
                        v-model="row.perMonthDate"
                        filterable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="i in 31"
                          :label="`${i}日`"
                          :value="`${i}`"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="row.per === MoneyIOPer.PER_DATE" :span="span6">
                    <el-form-item
                      :prop="`inouts.${$index}.perDate`"
                      :rules="selectRuquiredRule"
                    >
                      <el-date-picker
                        v-model="row.perDate"
                        class="w-full!"
                        type="date"
                        format="YYYY-MM-DD"
                        placeholder="请选择"
                        clearable
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="span6">
                    <el-form-item
                      :prop="`inouts.${$index}.amount`"
                      :rules="decimalRules"
                    >
                      <el-input
                        v-model="row.amount"
                        clearable
                        placeholder="请输入"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="90">
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

    <div>
      <el-button type="primary" @click="onClickCalc">计算</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FormInstance } from "element-plus";
import { useSpan } from "./useSpan";
import { MoneyIO, MoneyIOPer, MoneyIOType } from "./enums";
import dayjs from "dayjs";

const { spanOne, spanFull, span6 } = useSpan();

const formRef = ref<FormInstance>();

const form = ref({
  startValue: "0",
  startDate: dayjs().format("YYYY-MM-DD"),
  inouts: [
    {
      type: MoneyIOType.OUT,
      per: MoneyIOPer.PER_MONTH,
      perMonthDate: "1",
      amount: "0",
    },
  ] as MoneyIO[],
});

const onClickAdd = () => {
  form.value.inouts.push({
    type: MoneyIOType.OUT,
    per: MoneyIOPer.PER_MONTH,
    perMonthDate: "1",
    amount: "0",
  });
};

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

const onClickCalc = async () => {
  await formRef.value!.validate();
};
</script>

<style lang="scss" scoped></style>
