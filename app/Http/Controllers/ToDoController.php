<?php

namespace App\Http\Controllers;

use App\Models\ToDo;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\DocBlock\Tags\Method;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class ToDoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Todo $todo)
    {
        $user_tods = Auth::user()->todos;
        return view('todo.index', ['user_todos'=>$user_tods]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $title = $request->title;
            $priority = $request->priority;
            $todo = new ToDo;
            $todo->title = $title;
            $todo->priority = $priority;
            $user = Auth::user();
            $user->todos()->save($todo);
        }catch (QueryException $e){
            return response()->json(['msg' => 'Todo was not added successfully added', 'type' => 'danger']);
        }
        return response()->json(['msg' => 'Todo is successfully added',
                                'type' => 'success',
                                'priority' => $todo->priority,
                                'id'=> $todo->id]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            $id = $request->id;
            Todo::destroy($id);

        }catch (QueryException $e){
            return response()->json(['msg' => 'Todo was not added successfully deleted', 'type' => 'danger']);
        }
        return response()->json(['msg' => 'Todo is successfully deleted', 'type' => 'success']);
    }
    public function done(Request $request)
    {
        try {
            $id = $request->id;
            $todo = Todo::findOrFail($id);
            $todo->done = true;
            $todo->save();
        }catch (ModelNotFoundException  $e) {
            return response()->json(['msg'=>'Todo was not done successfully', 'type'=>'danger']);
        }
        return response()->json('');
    }
    public function undone(Request $request)
    {
        try {
            $id = $request->id;
            $todo = Todo::findOrFail($id);
            $todo->done = false;
            $todo->save();
        }catch (ModelNotFoundException  $e) {
            return response()->json(['error'=>'Todo was not undone successfully', 'type'=>'danger'], 404);
        }
        return response()->json('');
    }
}
