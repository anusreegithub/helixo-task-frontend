import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../../schema/timerSchema";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Card,
  FormLayout,
  TextField,
  InlineError,
  Frame,
  Toast,
  Select,
} from "@shopify/polaris";
import { baseUrl } from "../constants/const";
import ProductSelect from "./ProductSelect";

function TimerForm({ onTimerCreated }) {
  const [toast, setToast] = useState({
    active: false,
    content: "",
    error: false,
  });

  const toggleToast = useCallback(() => {
    setToast((prev) => ({ ...prev, active: !prev.active }));
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: "",
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      size: "Medium",
      position: "Top",
      color: "#000000", // ✅ Default value so color picker starts with black
    },
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    const payload = {
      productId: data.productId,
      name: data.name,
      description: data.description,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
      style: {
        size: data.size,
        position: data.position,
        color: data.color,
      },
    };

    try {
      const res = await fetch(`${baseUrl}/timer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setToast({
          active: true,
          content: "Timer created successfully!",
          error: false,
        });
        if (onTimerCreated) onTimerCreated();
        reset();
      } else {
        setToast({
          active: true,
          content: "Failed to create timer.",
          error: true,
        });
      }
    } catch (err) {
      console.error("Error creating timer:", err);
      setToast({
        active: true,
        content: "Server error. Please try again.",
        error: true,
      });
    }
  };

  const toastMarkup = toast.active ? (
    <Toast
      content={toast.content}
      onDismiss={toggleToast}
      error={toast.error}
    />
  ) : null;

  return (
    <Frame>
      <Card sectioned title="Create Countdown Timer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            {/* Product Selector */}
            <ProductSelect control={control} errors={errors} />
            {errors.productId && (
              <InlineError
                message={errors.productId.message}
                fieldID="productId"
              />
            )}

            {/* Timer Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Timer Name"
                  {...field}
                  error={errors.name?.message}
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description"
                  {...field}
                  error={errors.description?.message}
                  multiline
                />
              )}
            />

            {/* Start Time */}
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Start Time"
                  type="datetime-local"
                  {...field}
                  error={errors.startTime?.message}
                />
              )}
            />
            {errors.startTime && (
              <InlineError
                message={errors.startTime.message}
                fieldID="startTime"
              />
            )}

            {/* End Time */}
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <TextField
                  label="End Time"
                  type="datetime-local"
                  {...field}
                  error={errors.endTime?.message}
                />
              )}
            />
            {errors.endTime && (
              <InlineError message={errors.endTime.message} fieldID="endTime" />
            )}

            {/* Size */}
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <Select
                  label="Size"
                  options={[
                    { label: "Small", value: "Small" },
                    { label: "Medium", value: "Medium" },
                    { label: "Large", value: "Large" },
                  ]}
                  {...field}
                  error={errors.size?.message}
                />
              )}
            />

            {/* Position */}
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Select
                  label="Position"
                  options={[
                    { label: "Top", value: "Top" },
                    { label: "Bottom", value: "Bottom" },
                  ]}
                  {...field}
                  error={errors.position?.message}
                />
              )}
            />

            {/* Color Picker */}
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Color"
                  type="color"
                  {...field}
                  error={errors.color?.message}
                />
              )}
            />

            {/* Submit Button */}
            <Button submit variant="primary">
              Create Timer
            </Button>
          </FormLayout>
        </form>
      </Card>
      {toastMarkup}
    </Frame>
  );
}

export default TimerForm;
