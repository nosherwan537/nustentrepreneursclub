export default function Register() {
    // ... existing state ...

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="card w-full max-w-md">
                <h1 className="section-title text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="input-field"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <p className="text-center text-sm text-neutral-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
} 