import React, { useCallback, useEffect, useState } from "react";
import {
  Page,
  Badge,
  LegacyCard,
  Text,
  InlineGrid,
  Modal,
} from "@shopify/polaris";
import { baseUrl } from "../constants/const";
import TimerForm from "./TimerForm";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString();
}

function AllTimersPage() {
  const [timers, setTimers] = useState([]);
  const [active, setActive] = useState(false);

  const fetchTimers = () => {
    fetch(`${baseUrl}/timer/store`)
      .then((res) => res.json())
      .then((data) => setTimers(data))
      .catch((err) => console.error("Failed to fetch timers", err));
  };

  useEffect(() => {
    fetchTimers();
  }, []);

  const handleModalChange = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Page
      fullWidth
      backAction={{ content: "Dashboard", url: "#" }}
      title="All Countdown Timers"
      titleMetadata={<Badge tone="info">{timers.length} timers</Badge>}
      subtitle="Manage all your store’s timers from one place"
      primaryAction={{
        content: "Create Timer",
        onAction: handleModalChange,
      }}
    >
      <Modal
        open={active}
        onClose={handleModalChange}
        title="Create New Timer"
        primaryAction={{
          content: "Close",
          onAction: handleModalChange,
        }}
      >
        <Modal.Section>
          <TimerForm
            onTimerCreated={() => {
              fetchTimers();
              handleModalChange();
            }}
          />
        </Modal.Section>
      </Modal>

      <InlineGrid columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        {timers.map((timer) => (
          <div
            key={timer._id}
            style={{
              width: "300px",
              height: "150px",
              paddingInline: "5px",
              boxSizing: "border-box",
            }}
          >
            <LegacyCard
              title={timer.name || "Unnamed Timer"}
              sectioned
              style={{ height: "100%" }}
            >
              <Text as="p" variant="bodyMd" truncate>
                {timer.description || "No description provided"}
              </Text>
              <Text
                as="p"
                variant="bodySm"
                tone="subdued"
                style={{ marginTop: "8px" }}
              >
                Start: {formatDate(timer.startTime)}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued">
                End: {formatDate(timer.endTime)}
              </Text>
            </LegacyCard>
          </div>
        ))}
      </InlineGrid>
    </Page>
  );
}

export default AllTimersPage;
