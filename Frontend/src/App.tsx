function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <div className="flex-1">
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth" element={<AuthLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}