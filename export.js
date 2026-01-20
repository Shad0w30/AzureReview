function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(window.allFindings);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Findings");
  XLSX.writeFile(wb, "azure-security-review.xlsx");
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  window.allFindings.forEach((f, i) => {
    pdf.text(`${f.service} | ${f.resource} | ${f.severity}`, 10, 10 + i*8);
  });

  pdf.save("azure-security-review.pdf");
}
