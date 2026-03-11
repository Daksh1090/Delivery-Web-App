function AdminStats() {
  const stats = [
    { title: "Total Orders", value: "120" },
    { title: "Total Foods", value: "45" },
    { title: "Users", value: "320" },
    { title: "Revenue", value: "$3,450" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">

          <h3 className="text-gray-500 text-sm">
            {item.title}
          </h3>

          <p className="text-2xl font-bold mt-2">
            {item.value}
          </p>

        </div>
      ))}

    </div>
  );
}

export default AdminStats;