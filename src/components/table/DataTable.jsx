import {Box, CircularProgress, LinearProgress, Table} from "@mui/joy";
import React, {useEffect, useMemo, useRef, useState} from "react";

export default function DataTable(props) {
     const {
          thead,
          tbody,
          loading,
          renderRow,
          rowKey,
          virtualized = false,
          rowHeight = 48,
          overscan = 8,
          maxBodyHeight = 640,
          fillAvailableHeight = false,
     } = props;
     const scrollRef = useRef(null);
     const frameRef = useRef(null);
     const lastScrollTopRef = useRef(0);
     const scrollIdleTimerRef = useRef(null);
     const lastScrollEventAtRef = useRef(0);
     const [scrollTop, setScrollTop] = useState(0);
     const [viewportHeight, setViewportHeight] = useState(maxBodyHeight);
     const [showScrollLoading, setShowScrollLoading] = useState(false);

     useEffect(() => {
          if (!virtualized || !scrollRef.current) {
               return undefined;
          }

          const element = scrollRef.current;
          const updateViewportHeight = () => {
               setViewportHeight(element.clientHeight || maxBodyHeight);
          };

          updateViewportHeight();
          window.addEventListener("resize", updateViewportHeight);

          return () => {
               window.removeEventListener("resize", updateViewportHeight);
          };
     }, [virtualized, maxBodyHeight]);

     useEffect(() => {
          return () => {
               if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
               }
               if (scrollIdleTimerRef.current) {
                    clearTimeout(scrollIdleTimerRef.current);
               }
          };
     }, []);

     const visibleRange = useMemo(() => {
          if (!virtualized) {
               return {
                    startIndex: 0,
                    endIndex: tbody.length,
               };
          }

          const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
          const maxStartIndex = Math.max(0, tbody.length - visibleCount);
          const startIndex = Math.min(
               maxStartIndex,
               Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
          );
          const endIndex = Math.min(tbody.length, startIndex + visibleCount);

          return {
               startIndex,
               endIndex,
          };
     }, [virtualized, tbody.length, scrollTop, rowHeight, overscan, viewportHeight]);

     const topSpacerHeight = virtualized ? visibleRange.startIndex * rowHeight : 0;
     const bottomSpacerHeight = virtualized
          ? Math.max(0, (tbody.length - visibleRange.endIndex) * rowHeight)
          : 0;
     const visibleRows = virtualized
          ? tbody.slice(visibleRange.startIndex, visibleRange.endIndex)
          : tbody;

     const getRowCells = (row, index) => {
          if (renderRow) {
               return renderRow(row, index);
          }

          return row;
     };

     const getKey = (row, index) => {
          if (rowKey) {
               return rowKey(row, index);
          }

          if (row && typeof row === "object" && "key" in row && row.key != null) {
               return row.key;
          }

          return index;
     };

     return (
          <div
               style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    minHeight: 0,
                    height: fillAvailableHeight ? "100%" : "auto",
                    position: "relative",
               }}
          >
               <div style={{ display: loading ? "block" : "none" }}>
                    <LinearProgress color="primary" variant="soft" />
               </div>
               {showScrollLoading ? (
                    <Box
                         sx={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              pointerEvents: "none",
                              zIndex: 2,
                              background:
                                   "linear-gradient(to bottom, rgba(245,250,255,0.2), rgba(219,233,245,0.45))",
                         }}
                    >
                         <CircularProgress size="lg" />
                    </Box>
               ) : null}
               <div
                    ref={scrollRef}
                    onScroll={(event) => {
                         if (virtualized) {
                              lastScrollEventAtRef.current = Date.now();
                              setShowScrollLoading(true);
                              if (scrollIdleTimerRef.current) {
                                   clearTimeout(scrollIdleTimerRef.current);
                              }
                              scrollIdleTimerRef.current = setTimeout(() => {
                                   if (Date.now() - lastScrollEventAtRef.current >= 120) {
                                        setShowScrollLoading(false);
                                   }
                              }, 120);
                              lastScrollTopRef.current = event.currentTarget.scrollTop;
                              if (frameRef.current) {
                                   return;
                              }
                              frameRef.current = requestAnimationFrame(() => {
                                   setScrollTop(lastScrollTopRef.current);
                                   setShowScrollLoading(false);
                                   frameRef.current = null;
                              });
                         }
                    }}
                    style={{
                         minHeight: 0,
                         ...(fillAvailableHeight ? {flexGrow: 1} : {}),
                         ...(!virtualized && fillAvailableHeight ? {overflowY: "auto"} : {}),
                         ...(virtualized
                              ? fillAvailableHeight
                                   ? {overflowY: "auto"}
                                   : {maxHeight: maxBodyHeight, overflowY: "auto"}
                              : {}),
                    }}
               >
                    <Table aria-label="striped table" stripe="odd"
                         sx={{
                              tableLayout: "auto!important",
                              "& td, & tr": {
                                   padding: 0,
                                   margin: 0,
                                   borderBottomWidth: 0,
                                   height: "unset",
                              }
                         }}
                    >
                         <thead>
                              <tr>
                                   {thead.map((value, index) => (
                                        <th
                                             key={index}
                                             style={{
                                                  padding: "0px",
                                                  margin: "0px",
                                             }}
                                        >
                                             {value}
                                        </th>
                                   ))}
                              </tr>
                         </thead>
                         <tbody>
                              {topSpacerHeight > 0 ? (
                                   <tr aria-hidden="true">
                                        <td colSpan={thead.length} style={{height: topSpacerHeight, padding: 0}} />
                                   </tr>
                              ) : null}
                              {visibleRows.map((row, visibleIndex) => {
                                   const actualIndex = virtualized
                                        ? visibleRange.startIndex + visibleIndex
                                        : visibleIndex;
                                   const cells = getRowCells(row, actualIndex);

                                   return (
                                        <tr
                                             style={{
                                                  backgroundColor:
                                                       actualIndex % 2 === 0
                                                            ? "#ffffff"
                                                            : "#f0f0f2",
                                             }}
                                             key={getKey(row, actualIndex)}
                                        >
                                             {cells.map((val, ind) => (
                                                  <td key={ind}
                                                       style={{
                                                            padding: "0px",
                                                            margin: "0px",
                                                       }}
                                                  >
                                                       {val}
                                                  </td>
                                             ))}
                                        </tr>
                                   );
                              })}
                              {bottomSpacerHeight > 0 ? (
                                   <tr aria-hidden="true">
                                        <td colSpan={thead.length} style={{height: bottomSpacerHeight, padding: 0}} />
                                   </tr>
                              ) : null}
                         </tbody>
                    </Table>
               </div>
          </div>
     );
}
