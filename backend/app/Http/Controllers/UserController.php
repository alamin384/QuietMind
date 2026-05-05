<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function getStats()
    {
        $userId = Auth::id();
        
        $totalEntries = Post::where('user_id', $userId)->count();
        
        $moodDistribution = Post::where('user_id', $userId)
            ->selectRaw('mood, count(*) as count')
            ->groupBy('mood')
            ->get();

        // Simple streak calculation (mocked for now, can be improved)
        $latestPost = Post::where('user_id', $userId)->latest()->first();
        $streak = 0;
        if ($latestPost) {
            // Very simple logic: if they posted in last 24h, streak is 1+, otherwise 0.
            // For a real streak, we'd loop through days.
            $streak = 1; 
        }

        return response()->json([
            'total_entries' => $totalEntries,
            'mood_distribution' => $moodDistribution,
            'streak' => $streak
        ]);
    }

    public function exportData()
    {
        $user = Auth::user();
        $posts = Post::where('user_id', $user->id)->latest()->get();

        $filename = "quietmind_export_" . date('Y-m-d') . ".csv";
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use($posts) {
            $file = fopen('php://output', 'w');
            // Write column headers
            fputcsv($file, ['Title', 'Content', 'Mood', 'Created At']);

            foreach ($posts as $post) {
                fputcsv($file, [
                    $post->title,
                    $post->content,
                    $post->mood,
                    $post->created_at
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function clearData()
    {
        $userId = Auth::id();
        Post::where('user_id', $userId)->delete();

        return response()->json([
            'message' => 'All journal entries have been cleared successfully.'
        ]);
    }
}
