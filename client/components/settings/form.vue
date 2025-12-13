<template>
  <div class="flex flex-column">
    <SwitchTheme />
    <BaseDivider class="mt-20" title="All Bread Crumbs Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getBreadCrumbSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="
          getBreadCrumbSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Standard"
        @click="setBreadCrumbSize('standard')"
      />
      <BaseButton
        :icon="getBreadCrumbSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="
          getBreadCrumbSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Semi Bold"
        class="mx-10"
        @click="setBreadCrumbSize('semiBold')"
      />
      <BaseButton
        :icon="getBreadCrumbSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getBreadCrumbSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setBreadCrumbSize('bold')"
      />
    </div>

    <BaseDivider class="mt-20" title="Sidebar Items Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getSidebarItemsSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="
          getSidebarItemsSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Standard"
        @click="setSidebarItemsSize('standard')"
      />
      <BaseButton
        :icon="getSidebarItemsSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="
          getSidebarItemsSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Semi Bold"
        class="mx-10"
        @click="setSidebarItemsSize('semiBold')"
      />
      <BaseButton
        :icon="getSidebarItemsSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getSidebarItemsSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setSidebarItemsSize('bold')"
      />
    </div>

    <BaseDivider class="mt-20" title="All Divider Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getDividerSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getDividerSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setDividerSize('standard')"
      />
      <BaseButton
        :icon="getDividerSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getDividerSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setDividerSize('semiBold')"
      />
      <BaseButton
        :icon="getDividerSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getDividerSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setDividerSize('bold')"
      />
    </div>

    <BaseDivider class="mt-20" title="All Title Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getTitleSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setTitleSize('standard')"
      />
      <BaseButton
        :icon="getTitleSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setTitleSize('semiBold')"
      />
      <BaseButton
        :icon="getTitleSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getTitleSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setTitleSize('bold')"
      />
    </div>
    <BaseTitle class="mt-10"
      >Lorem ipsum dolor sit, amet consectetur adipisicing elit.</BaseTitle
    >
    <BaseDivider class="mt-20" title="All Subtitle Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getSubTitleSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setSubTitleSize('standard')"
      />
      <BaseButton
        :icon="getSubTitleSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setSubTitleSize('semiBold')"
      />
      <BaseButton
        :icon="getSubTitleSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getSubTitleSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setSubTitleSize('bold')"
      />
    </div>
    <BaseSubTitle class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseSubTitle
    >
    <BaseDivider class="mt-20" title="All Text Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getTextSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setTextSize('standard')"
      />
      <BaseButton
        :icon="getTextSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setTextSize('semiBold')"
      />
      <BaseButton
        :icon="getTextSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getTextSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setTextSize('bold')"
      />
    </div>
    <BaseText class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseText
    >
    <BaseDivider class="mt-20" title="All Descrption Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getDescrptionSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="
          getDescrptionSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Standard"
        @click="setDescrptionSize('standard')"
      />
      <BaseButton
        :icon="getDescrptionSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="
          getDescrptionSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'
        "
        name="Semi Bold"
        class="mx-10"
        @click="setDescrptionSize('semiBold')"
      />
      <BaseButton
        :icon="getDescrptionSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getDescrptionSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setDescrptionSize('bold')"
      />
    </div>
    <BaseDescription class="mt-10"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      necessitatibus incidunt, sequi illum provid...</BaseDescription
    >
    <BaseDivider class="mt-20" title="All Label Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getLabelSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getLabelSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setLabelSize('standard')"
      />
      <BaseButton
        :icon="getLabelSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getLabelSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setLabelSize('semiBold')"
      />
      <BaseButton
        :icon="getLabelSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getLabelSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setLabelSize('bold')"
      />
    </div>
    <BaseInput label="Fristname" class="mt-10" />
    <BaseDivider class="mt-20" title="All Date Fonts Size" />
    <div class="flex align-center mt-10">
      <BaseButton
        :icon="getDateSize == 'standard' ? 'bi:patch-check' : ''"
        :bg="getDateSize == 'standard' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Standard"
        @click="setDateSize('standard')"
      />
      <BaseButton
        :icon="getDateSize == 'semiBold' ? 'bi:patch-check' : ''"
        :bg="getDateSize == 'semiBold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Semi Bold"
        class="mx-10"
        @click="setDateSize('semiBold')"
      />
      <BaseButton
        :icon="getDateSize == 'bold' ? 'bi:patch-check' : ''"
        :bg="getDateSize == 'bold' ? 'bg-secondary-1' : 'bg-primary-1'"
        name="Bold"
        @click="setDateSize('bold')"
      />
    </div>
    <BaseDate class="mt-10">2023/04/03 12:45</BaseDate>
  </div>
</template>

<script setup>
import { applicationController } from '../../controllers/Application';
const applicationStore = useApplicationStore();

const setTitleSize = async (param) => {
  applicationStore.setTitleSize(param);
  await applicationController.updateStyle({ title: param });
};

const setSubTitleSize = async (param) => {
  applicationStore.setSubTitleSize(param);
  await applicationController.updateStyle({ subTitle: param });
};

const setTextSize = async (param) => {
  applicationStore.setTextSize(param);
  await applicationController.updateStyle({ text: param });
};

const setLabelSize = async (param) => {
  applicationStore.setLabelSize(param);
  await applicationController.updateStyle({ label: param });
};

const setDateSize = async (param) => {
  applicationStore.setDateSize(param);
  await applicationController.updateStyle({ date: param });
};

const setDescrptionSize = async (param) => {
  applicationStore.setDescrptionSize(param);
  await applicationController.updateStyle({ descrption: param });
};

const setBreadCrumbSize = async (param) => {
  applicationStore.setBreadCrumbSize(param);
  await applicationController.updateStyle({ breadCrumb: param });
};

const setSidebarItemsSize = async (param) => {
  applicationStore.setSidebarItemsSize(param);
  await applicationController.updateStyle({ sidebarItems: param });
};

const setDividerSize = async (param) => {
  applicationStore.setDividerSize(param);
  await applicationController.updateStyle({ divider: param });
};

const getTitleSize = computed(() => {
  return applicationStore._state.title;
});

const getSubTitleSize = computed(() => {
  return applicationStore._state.subTitle;
});

const getTextSize = computed(() => {
  return applicationStore._state.text;
});

const getDescrptionSize = computed(() => {
  return applicationStore._state.descrption;
});

const getLabelSize = computed(() => {
  return applicationStore._state.label;
});

const getDateSize = computed(() => {
  return applicationStore._state.date;
});

const getBreadCrumbSize = computed(() => {
  return applicationStore._state.breadCrumb;
});

const getSidebarItemsSize = computed(() => {
  return applicationStore._state.sidebarItems;
});

const getDividerSize = computed(() => {
  return applicationStore._state.divider;
});
</script>
