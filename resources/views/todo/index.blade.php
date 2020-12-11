@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card" id="todo_card">
                    <div class="card-header">
                        {{ __('My Todo list') }}
                    </div>

                    <div class="card-body">
                        <x-alert/>
                        <form class="add-items">
                            <div class="form-row form-inline">
                                <div class="col">
                                    <input type="text" class="input-radius form-control todo-list-input"
                                           placeholder="What do you need to do today?"
                                           id="todo_title">
                                </div>
                                <div class="col">
                                    <input type="range" min="1" max="100" value="50" class="form-control-range"
                                           name="priority" id="todo_priority">
                                </div>

                            </div>
                            <button id="add_todo"
                                    class="add btn btn-success font-weight-bold todo-list-add-btn btn-radius">Add
                            </button>

                        </form>

                        <div class="list-wrapper">
                            <ul class="d-flex flex-column-reverse todo-list">
                                @foreach($user_todos as $user_todo)

                                    <li class="{{ $user_todo->done?'completed':''}}" data-id="{{ $user_todo->id  }}" data-priority="{{$user_todo->priority}}">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="checkbox"
                                                       type="checkbox" {{ $user_todo->done?'checked':''  }}>
                                                {{ $user_todo->title }}<i class="input-helper"></i>
                                            </label>
                                        </div>
                                        <i class="remove mdi mdi-close-circle-outline"></i>
                                    </li>
                                @endforeach

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
